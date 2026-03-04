import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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
import { decrypt } from 'src/utils/encryption.util';

@Injectable()
export class BankService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: DatabaseClient,
  ) {}

  public async getAll({ budgetId }) {
    const bankRecords = await this.db
      .select(this._bankColumns)
      .from(bankTable)
      .innerJoin(budgetTable, eq(budgetTable.id, bankTable.budgetId))
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(
        and(
          eq(userBudgetTable.userId, this._userId),
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

      const tellerClient = new TellerClient(accessToken);
      const bankInfo = await tellerClient.getBank(bankRecord.tellerId);
      const balance = await tellerClient.getBalances(bankInfo.id);

      result.push({
        id: bankRecord.id,
        budget: {
          ...bankRecord.budget,
          color:
            ColorEnum[
              snakeToPascalCase(
                bankRecord.budget.color,
              ) as keyof typeof ColorEnum
            ],
        },
        balance: balance.available ? parseFloat(balance.available) : 0,
        currency: bankInfo.currency,
        enrollmentId: bankInfo.enrollment_id,
        institution: bankInfo.institution,
        lastFour: parseInt(bankInfo.last_four),
        name: bankInfo.name,
        color:
          ColorEnum[
            snakeToPascalCase(bankRecord.color) as keyof typeof ColorEnum
          ],
        type: BankTypeEnum[
          snakeToPascalCase(bankInfo.type) as keyof typeof BankTypeEnum
        ],
        subtype:
          BankSubtypeEnum[
            snakeToPascalCase(bankInfo.subtype) as keyof typeof BankSubtypeEnum
          ],
        status:
          BankStatusEnum[
            snakeToPascalCase(bankInfo.status) as keyof typeof BankStatusEnum
          ],
      });
    }

    return result;
  }
  public async get({ id }) {
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
          and(eq(bankTable.id, id), eq(userBudgetTable.userId, this._userId)),
        )
    )[0];

    const accessToken = decrypt(result.accessToken, result.accessTokenIV);

    const tellerClient = new TellerClient(accessToken);
    const bankInfo = await tellerClient.getBank(result.tellerId);
    const balance = await tellerClient.getBalances(bankInfo.id);

    return {
      id: result.id,
      budget: {
        ...result.budget,
        color:
          ColorEnum[
            snakeToPascalCase(result.budget.color) as keyof typeof ColorEnum
          ],
      },
      balance: balance.available ? parseFloat(balance.available) : 0,
      currency: bankInfo.currency,
      enrollmentId: bankInfo.enrollment_id,
      institution: bankInfo.institution,
      lastFour: parseInt(bankInfo.last_four),
      name: bankInfo.name,
      color:
        ColorEnum[snakeToPascalCase(result.color) as keyof typeof ColorEnum],
      type: BankTypeEnum[
        snakeToPascalCase(bankInfo.type) as keyof typeof BankTypeEnum
      ],
      subtype:
        BankSubtypeEnum[
          snakeToPascalCase(bankInfo.subtype) as keyof typeof BankSubtypeEnum
        ],
      status:
        BankStatusEnum[
          snakeToPascalCase(bankInfo.status) as keyof typeof BankStatusEnum
        ],
    };
  }

  public async create({ input }) {
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
        .where(eq(userBudgetTable.userId, this._userId))
    )[0];

    const tellerClient = new TellerClient(input.accessToken);
    const banks = await tellerClient.getBanks();

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
          const balance = await tellerClient.getBalances(bankInfo.id);

          return {
            id: result.id,
            budget: {
              ...budget,
              color:
                ColorEnum[
                  snakeToPascalCase(budget.color) as keyof typeof ColorEnum
                ],
            },
            balance: balance.available ? parseFloat(balance.available) : 0,
            currency: bankInfo.currency,
            enrollmentId: bankInfo.enrollment_id,
            institution: bankInfo.institution,
            lastFour: parseInt(bankInfo.last_four),
            name: bankInfo.name,
            color:
              ColorEnum[
                snakeToPascalCase(result.color) as keyof typeof ColorEnum
              ],
            type: BankTypeEnum[
              snakeToPascalCase(bankInfo.type) as keyof typeof BankTypeEnum
            ],
            subtype:
              BankSubtypeEnum[
                snakeToPascalCase(
                  bankInfo.subtype,
                ) as keyof typeof BankSubtypeEnum
              ],
            status:
              BankStatusEnum[
                snakeToPascalCase(
                  bankInfo.status,
                ) as keyof typeof BankStatusEnum
              ],
          };
        }),
      );
    } catch {
      throw new Error('Bank is already linked');
    }
  }

  public async delete({ id }) {
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

        await new TellerClient(accessToken).deleteBank(id);
      } catch {
        tx.rollback();
      }
    });

    return result!.id;
  }
}
