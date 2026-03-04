import { Inject, Injectable, Scope } from '@nestjs/common';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { UUID } from 'crypto';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { auth } from 'src/lib/auth/auth';
import {
  BANK_CLIENT,
  type BankClient,
} from 'src/lib/bankClient/bankClient.module';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import {
  bankTable,
  budgetTable,
  userBudgetTable,
} from 'src/lib/db/schema/schema';
import { Bank } from 'src/lib/graphhql/bank.schema';
import { CreateAccountInput } from 'src/lib/graphhql/inputs/bank.inputs';
import { decrypt, encrypt } from 'src/utils/encryption.util';

@Injectable({ scope: Scope.REQUEST })
export class BankService {
  private _bankColumns = {
    ...getTableColumns(bankTable),
    budget: { ...getTableColumns(budgetTable) },
  };

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DatabaseClient,
    @Inject(BANK_CLIENT)
    private readonly bankClient: BankClient,
    private readonly authService: AuthService<typeof auth>,
  ) {}

  public async getAll({ budgetId }: { budgetId: string }) {
    const session = await this.authService.api.getSession();

    const bankRecords = await this.db
      .select(this._bankColumns)
      .from(bankTable)
      .innerJoin(budgetTable, eq(budgetTable.id, bankTable.budgetId))
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(
        and(
          eq(userBudgetTable.userId, session?.user.id),
          budgetId
            ? eq(budgetTable.id, budgetId)
            : eq(budgetTable.isDefault, true),
        ),
      );

    const result: Bank[] = [];
    for (const bankRecord of bankRecords) {
      const accessToken = decrypt(
        bankRecord.accessToken,
        bankRecord.accessTokenIV,
      );

      const bankInfo = (
        await this.bankClient(accessToken).accounts.get(bankRecord.tellerId)
      )?.data;
      const balance = (
        await this.bankClient(accessToken)
          .accounts(bankRecord.tellerId)
          .balances.get()
      )?.data;

      result.push({
        id: bankRecord.id,
        tellerId: bankRecord.tellerId,
        budget: {
          ...bankRecord.budget,
        },
        budgetId: bankRecord.budgetId,
        balance: balance.available ? parseFloat(balance.available) : 0,
        currency: bankInfo?.currency,
        enrollmentId: bankInfo?.enrollment_id,
        institution: bankInfo?.institution,
        lastFour: parseInt(bankInfo?.last_four),
        name: bankInfo?.name,
        color: bankRecord.color,
        type: bankInfo?.type,
        subtype: bankInfo?.subtype,
        status: bankInfo?.status,
      });
    }

    return result;
  }
  public async get({ id }: { id: string }) {
    const session = await this.authService.api.getSession();

    const result = (
      await this.db
        .select(this._bankColumns)
        .from(bankTable)
        .innerJoin(budgetTable, eq(budgetTable.id, bankTable.budgetId))
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(
          and(
            eq(bankTable.id, id),
            eq(userBudgetTable.userId, session?.user.id),
          ),
        )
    )[0];

    const accessToken = decrypt(result.accessToken, result.accessTokenIV);

    const bankInfo = (
      await this.bankClient(accessToken).accounts.get(result.tellerId)
    ).data;
    const balance = (
      await this.bankClient(accessToken)
        .accounts(result.tellerId)
        .balances.get()
    ).data;

    return {
      id: result.id,
      budget: {
        ...result.budget,
      },
      balance: balance.available ? parseFloat(balance.available) : 0,
      currency: bankInfo.currency,
      enrollmentId: bankInfo.enrollment_id,
      institution: bankInfo.institution,
      lastFour: parseInt(bankInfo.last_four),
      name: bankInfo.name,
      color: result.color,
      type: bankInfo.type,
      subtype: bankInfo.subtype,
      status: bankInfo.status,
    };
  }

  public async create({ input }: { input: CreateAccountInput }) {
    const session = await this.authService.api.getSession();

    const { iv: accessTokenIV, encryptedToken: accessToken } = encrypt(
      input.accessToken,
    );

    const budget = (
      await this.db
        .select(getTableColumns(budgetTable))
        .from(budgetTable)
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(eq(userBudgetTable.userId, session?.user.id))
    )[0];

    const banks = (await this.bankClient(input.accessToken).accounts.list())
      .data;

    try {
      const results = await this.db
        .insert(bankTable)
        .values(
          banks.map((bank) => ({
            budgetId: budget.id,
            tellerId: bank.id,
            accessToken,
            accessTokenIV,
          })),
        )
        .returning({
          id: bankTable.id,
          tellerId: bankTable.tellerId,
          color: bankTable.color,
        });

      return await Promise.all(
        results.map(async (result) => {
          const bankInfo = banks.find((bank) => bank.id == result.tellerId)!;
          const balance = (
            await this.bankClient(input.accessToken)
              .accounts(bankInfo.id)
              .balances.get()
          ).data;

          return {
            id: result.id,
            budget: {
              ...budget,
            },
            balance: balance.available ? parseFloat(balance.available) : 0,
            currency: bankInfo.currency,
            enrollmentId: bankInfo.enrollment_id,
            institution: bankInfo.institution,
            lastFour: parseInt(bankInfo.last_four),
            name: bankInfo.name,
            color: result.color,
            type: bankInfo.type,
            subtype: bankInfo.subtype,
            status: bankInfo.status,
          };
        }),
      );
    } catch {
      throw new Error('Bank is already linked');
    }
  }

  public async delete({ id }: { id: string }) {
    let result: typeof bankTable.$inferSelect;

    await this.db.transaction(async (tx) => {
      try {
        result = (
          await this.db
            .delete(bankTable)
            .where(eq(bankTable.id, id))
            .returning()
        )[0];

        if (!result) throw new Error('Bank with that Id was not found');

        const accessToken = decrypt(result.accessToken, result.accessTokenIV);

        await this.bankClient(accessToken).accounts.delete(id);
      } catch {
        tx.rollback();
      }
    });

    return result!.id;
  }
}
