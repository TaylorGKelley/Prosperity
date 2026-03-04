import { Inject, Injectable } from '@nestjs/common';
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
import { UUID } from 'node:crypto';
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
import { Transaction } from 'src/lib/graphhql/transaction.schema';
import Cursor from 'src/utils/cursor.util';
import { decrypt } from 'src/utils/encryption.util';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: DatabaseClient,

    @Inject(BANK_CLIENT)
    private bankClient: BankClient,
  ) {}

  public async getAll({ monthDate, budgetId, pagination }) {
    let cursorFilter = undefined;

    // Set the filter for pagination if it's part of the request
    if (pagination?.cursor) {
      const { date, id } = Cursor.decode(pagination.cursor);
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
          eq(userBudgetTable.userId, this._userId),
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
          const accountInfo = await new TellerClient(
            decrypt(item.account.accessToken, item.account.accessTokenIV),
          ).getAccount(item.account.tellerId);

          return {
            ...item,
            account: {
              id: item.id,
              currency: accountInfo.currency,
              enrollmentId: accountInfo.enrollment_id,
              institution: accountInfo.institution,
              lastFour: parseInt(accountInfo.last_four),
              name: accountInfo.name,
              color:
                ColorEnum[
                  snakeToPascalCase(
                    item.account.color,
                  ) as keyof typeof ColorEnum
                ],
              type: AccountTypeEnum[
                snakeToPascalCase(
                  accountInfo.type,
                ) as keyof typeof AccountTypeEnum
              ],
              subtype:
                AccountSubtypeEnum[
                  snakeToPascalCase(
                    accountInfo.subtype,
                  ) as keyof typeof AccountSubtypeEnum
                ],
              status:
                AccountStatusEnum[
                  snakeToPascalCase(
                    accountInfo.status,
                  ) as keyof typeof AccountStatusEnum
                ],
            },
            category: item.category
              ? {
                  ...item.category,
                  color:
                    ColorEnum[
                      snakeToPascalCase(
                        item.category.color,
                      ) as keyof typeof ColorEnum
                    ],
                  icon: IconEnum[
                    snakeToPascalCase(
                      item.category.icon,
                    ) as keyof typeof IconEnum
                  ],
                }
              : {
                  id: '00000000-0000-0000-0000-000000000000' as UUID,
                  name: 'Other',
                  icon: IconEnum.Ellipsis,
                  color: ColorEnum.Blue,
                },
            status:
              TransactionStatusEnum[
                snakeToPascalCase(
                  item.status,
                ) as keyof typeof TransactionStatusEnum
              ],
          } as Transaction;
        }),
      ),
      pageInfo: pagination && {
        length: items.length,
        hasNextPage: hasNextPage!,
        endCursor: endCursor!,
      },
    };
  }

  public async get({ id }) {
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
          eq(userBudgetTable.budgetId, accountTable.budgetId),
        )
        .where(
          and(
            eq(userBudgetTable.userId, this._userId),
            eq(transactionTable.id, id),
          ),
        )
    )?.[0];

    const accountInfo = await new TellerClient(
      decrypt(result.account.accessToken, result.account.accessTokenIV),
    ).getAccount(result.account.tellerId);

    return {
      ...result,
      account: {
        id: result.id,
        currency: accountInfo.currency,
        enrollmentId: accountInfo.enrollment_id,
        institution: accountInfo.institution,
        lastFour: parseInt(accountInfo.last_four),
        name: accountInfo.name,
        color:
          ColorEnum[
            snakeToPascalCase(result.account.color) as keyof typeof ColorEnum
          ],

        type: AccountTypeEnum[
          snakeToPascalCase(accountInfo.type) as keyof typeof AccountTypeEnum
        ],
        subtype:
          AccountSubtypeEnum[
            snakeToPascalCase(
              accountInfo.subtype,
            ) as keyof typeof AccountSubtypeEnum
          ],
        status:
          AccountStatusEnum[
            snakeToPascalCase(
              accountInfo.status,
            ) as keyof typeof AccountStatusEnum
          ],
      },
      category: result.category && {
        ...result.category,
        color:
          ColorEnum[
            snakeToPascalCase(result.category.color) as keyof typeof ColorEnum
          ],
        icon: IconEnum[
          snakeToPascalCase(result.category.icon) as keyof typeof IconEnum
        ],
      },
      status:
        TransactionStatusEnum[
          snakeToPascalCase(result.status) as keyof typeof TransactionStatusEnum
        ],
    };
  }

  public async sync() {
    try {
      const accounts = await this.db
        .select(getTableColumns(bankTable))
        .from(bankTable)
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, bankTable.budgetId),
        )
        .where(eq(userBudgetTable.userId, this._userId));

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
                .where(eq(transactionTable.accountId, account.id))
                .orderBy(asc(transactionTable.date), asc(transactionTable.id))
                .limit(1)
            )[0];

            const accessToken = decrypt(
              account.accessToken,
              account.accessTokenIV,
            );

            const accountTransactions = await this.bankClient
              .accounts(account.tellerId)
              .transactions.list(
                accessToken,
                lastTransaction?.tellerId
                  ? {
                      from_id: lastTransaction.tellerId,
                    }
                  : undefined,
              );

            accountTransactions.forEach((transaction) =>
              transactions.push({
                tellerId: transaction.id,
                accountId: account.id,
                categoryId: null, // user can set it later
                amount: parseFloat(transaction.amount),
                date: new Date(transaction.date),
                description: transaction.description,
                status:
                  TransactionStatusEnum[
                    snakeToPascalCase(
                      transaction.status,
                    ) as keyof typeof TransactionStatusEnum
                  ],
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
        status: TransactionSyncStatusEnum.Success,
      };
    } catch (error) {
      return {
        status: TransactionSyncStatusEnum.Error,
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

  public async delete({ id }): Promise<UUID> {
    const result = (
      await this.db
        .delete(transactionTable)
        .where(eq(transactionTable.id, id))
        .returning({ id: transactionTable.id })
    )[0];

    return result.id as UUID;
  }
}
