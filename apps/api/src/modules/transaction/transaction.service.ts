import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { SQL } from 'drizzle-orm';
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  gt,
  lt,
  lte,
  or,
} from 'drizzle-orm';
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
  categoryTable,
  transactionTable,
  userBudgetTable,
} from 'src/lib/db/schema/schema';
import { Color, Icon } from 'src/lib/graphhql/enums/category.enums';
import { TransactionSyncStatus } from 'src/lib/graphhql/enums/transaction.enums';
import { PaginationInput } from 'src/lib/graphhql/inputs/utils.inputs';
import Cursor from 'src/utils/cursor.util';
import { decrypt } from 'src/utils/encryption.util';

@Injectable()
export class TransactionService {
  private readonly _transactionColumns = {
    ...getTableColumns(transactionTable),
    bank: {
      ...getTableColumns(bankTable),
    },
    category: {
      ...getTableColumns(categoryTable),
    },
  };

  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: DatabaseClient,

    @Inject(BANK_CLIENT)
    private bankClient: BankClient,

    private authService: AuthService<typeof auth>,
  ) {}

  public async getAll({
    monthDate,
    budgetId,
    pagination,
  }: {
    monthDate: Date;
    budgetId: string;
    pagination?: PaginationInput;
  }) {
    const session = await this.authService.api.getSession();

    let cursorFilter: SQL | undefined = undefined;

    // Set the filter for pagination if it's part of the request
    if (pagination?.cursor) {
      const { date, id } = Cursor.decode(pagination.cursor) as {
        date: string;
        id: string;
      };
      const filterDate = new Date(date);

      cursorFilter = or(
        lt(transactionTable.date, filterDate), // smaller date
        and(eq(transactionTable.date, filterDate), lt(transactionTable.id, id)), // same date but smaller id
      );
    }

    // Query the database
    const query = this.db
      .select({
        ...this._transactionColumns,
        budgetId: userBudgetTable.budgetId,
      })
      .from(transactionTable)
      .innerJoin(bankTable, eq(bankTable.id, transactionTable.bankId))
      .leftJoin(
        categoryTable,
        eq(categoryTable.id, transactionTable.categoryId),
      )
      .innerJoin(
        userBudgetTable,
        eq(userBudgetTable.budgetId, bankTable.budgetId),
      )
      .innerJoin(budgetTable, eq(budgetTable.id, userBudgetTable.budgetId))
      .where(
        and(
          eq(userBudgetTable.userId, session!.user.id),
          budgetId
            ? eq(budgetTable.id, budgetId)
            : eq(budgetTable.isDefault, true),
          !monthDate
            ? undefined
            : lte(
                transactionTable.date,
                new Date(
                  monthDate.getUTCFullYear(),
                  monthDate.getUTCMonth() + 1,
                  0,
                ),
              ),
          !monthDate
            ? undefined
            : gt(
                transactionTable.date,
                new Date(
                  monthDate.getUTCFullYear(),
                  monthDate.getUTCMonth(),
                  1,
                ),
              ),
          cursorFilter,
        ),
      )
      .orderBy(desc(transactionTable.date), desc(transactionTable.id));
    if (pagination?.count) query.limit(pagination.count + 1);

    const results = await query;

    // Get info for the next page
    const hasNextPage = pagination
      ? results.length > pagination.count
      : undefined;
    const items = pagination ? results.slice(0, pagination.count) : results;

    const endCursor =
      pagination && items
        ? items.length > 0
          ? Cursor.encode({
              date: items[items.length - 1].date.toISOString(),
              id: items[items.length - 1].id,
            })
          : null
        : undefined;

    return {
      items: await Promise.all(
        items.map(async (item) => {
          const bankInfo = (
            await this.bankClient(
              decrypt(item.bank.accessToken, item.bank.accessTokenIV),
            ).accounts.get(item.bank.tellerId)
          ).data;

          return {
            ...item,
            bank: {
              id: item.id,
              tellerId: item.bank.tellerId,
              currency: bankInfo.currency,
              enrollmentId: bankInfo.enrollment_id,
              institution: bankInfo.institution,
              lastFour: parseInt(bankInfo.last_four),
              name: bankInfo.name,
              color: item.bank.color,
              type: bankInfo.type,
              subtype: bankInfo.subtype,
              status: bankInfo.status,
            },
            category: item.category
              ? item.category
              : {
                  id: '00000000-0000-0000-0000-000000000000',
                  name: 'Other',
                  icon: Icon.ELLIPSIS,
                  color: Color.BLUE,
                },
          };
        }),
      ),
      pageInfo: pagination && {
        length: items.length,
        hasNextPage: hasNextPage!,
        endCursor: endCursor!,
      },
    };
  }

  public async get({ id }: { id: string }) {
    const session = await this.authService.api.getSession();

    const result = (
      await this.db
        .select({
          ...this._transactionColumns,
          budgetId: userBudgetTable.budgetId,
        })
        .from(transactionTable)
        .innerJoin(bankTable, eq(bankTable.id, transactionTable.bankId))
        .leftJoin(
          categoryTable,
          eq(categoryTable.id, transactionTable.categoryId),
        )
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, bankTable.budgetId),
        )
        .where(
          and(
            eq(userBudgetTable.userId, session!.user.id),
            eq(transactionTable.id, id),
          ),
        )
    )?.[0];

    const bankInfo = (
      await this.bankClient(
        decrypt(result.bank.accessToken, result.bank.accessTokenIV),
      ).accounts.get(result.bank.tellerId)
    ).data;

    return {
      ...result,
      account: {
        id: result.id,
        currency: bankInfo.currency,
        enrollmentId: bankInfo.enrollment_id,
        institution: bankInfo.institution,
        lastFour: parseInt(bankInfo.last_four),
        name: bankInfo.name,
        color: result.bank.color,
        type: bankInfo.type,
        subtype: bankInfo.subtype,
        status: bankInfo.status,
      },
      category: result.category,
    };
  }

  public async sync() {
    try {
      const session = await this.authService.api.getSession();

      const accounts = await this.db
        .select(getTableColumns(bankTable))
        .from(bankTable)
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, bankTable.budgetId),
        )
        .where(eq(userBudgetTable.userId, session!.user.id));

      await this.db.transaction(async (tw) => {
        try {
          // Get transaction's for each account
          const transactions: (typeof transactionTable.$inferInsert)[] = [];
          for (const account of accounts) {
            // Clear out any *Pending* transaction's to resync incase they are now posted
            tw.delete(transactionTable).where(
              eq(transactionTable.status, 'PENDING'),
            );

            const lastTransaction:
              | typeof transactionTable.$inferSelect
              | undefined = (
              await tw
                .select()
                .from(transactionTable)
                .where(eq(transactionTable.bankId, account.id))
                .orderBy(asc(transactionTable.date), asc(transactionTable.id))
                .limit(1)
            )[0];

            const accessToken = decrypt(
              account.accessToken,
              account.accessTokenIV,
            );

            const accountTransactions = (
              await this.bankClient(accessToken)
                .accounts(account.tellerId)
                .transactions.list(
                  lastTransaction?.tellerId
                    ? {
                        from_id: lastTransaction.tellerId,
                      }
                    : undefined,
                )
            ).data;

            accountTransactions.forEach((transaction) =>
              transactions.push({
                tellerId: transaction.id,
                bankId: account.id,
                categoryId: null, // user can set it later
                amount: parseFloat(transaction.amount),
                date: new Date(transaction.date),
                description: transaction.description,
                status: transaction.status.toUpperCase() as
                  | 'POSTED'
                  | 'PENDING',
                type: transaction.type,
                metadata: {
                  category: transaction.details.category,
                  counterparty: {
                    name: transaction.details.counterparty.name,
                    type: transaction.details.counterparty.type as
                      | 'organization'
                      | 'person',
                  },
                  processingStatus: transaction.details.processing_status,
                },
              }),
            );
          }
          if (transactions.length > 0)
            await tw
              .insert(transactionTable)
              .values(transactions)
              .onConflictDoUpdate({
                target: transactionTable.tellerId,
                set: {
                  // If there's a conflict on tellerId, update all fields except accountId and tellerId
                  categoryId: transactionTable.categoryId,
                  amount: transactionTable.amount,
                  date: transactionTable.date,
                  description: transactionTable.description,
                  status: transactionTable.status,
                  type: transactionTable.type,
                  metadata: transactionTable.metadata,
                },
              });
        } catch (error) {
          console.error(error);
          tw.rollback();
        }
      });

      return {
        status: TransactionSyncStatus.SUCCESS,
      };
    } catch (error) {
      return {
        status: TransactionSyncStatus.ERROR,
        error: (error as Error).message,
      };
    }
  }

  // public async create({
  // 	input,
  // }: MutationCreateTransactionArgs): Promise<Transaction> {
  // 	const result = {} as Transaction;
  // 	await this.db
  // 		.insert(transactionTable)
  // 		.values({ ...input })
  // 		.returning()
  // )[0] as Transaction;

  // 	return result;
  // }

  // public async update({
  // 	input,
  // }: MutationUpdateTransactionArgs): Promise<Transaction> {
  // 	const result = (
  // 		await this.db
  // 			.update(transactionTable)
  // 			.set({
  // 				categoryId: input.categoryId || undefined,
  // 				amount: input.amount || undefined,
  // 				date: input.date || undefined,
  // 				description: input.description || undefined,
  // 			})
  // 			.where(
  // 				and(
  // 					// eq(transactionTable.userId, this._userId),
  // 					eq(transactionTable.id, input.id)
  // 				)
  // 			)
  // 			.returning()
  // 	)[0] as Transaction;

  // 	return result;
  // }

  public async delete({ id }: { id: string }) {
    const result = (
      await this.db
        .delete(transactionTable)
        .where(eq(transactionTable.id, id))
        .returning({ id: transactionTable.id })
    )[0];

    return result.id;
  }
}
