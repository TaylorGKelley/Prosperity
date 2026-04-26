import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthService } from '@thallesp/nestjs-better-auth';
import {
  eq,
  and,
  asc,
  getTableColumns,
  sql,
  lte,
  or,
  isNull,
  gte,
  gt,
} from 'drizzle-orm';
import { randomUUID } from 'node:crypto';

import { auth } from 'src/lib/auth/auth';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import {
  budgetTable,
  categoryTable,
  transactionTable,
  userBudgetTable,
} from 'src/lib/db/schema/schema';
import { Category } from 'src/lib/graphql/category.schema';
import { Color, Icon } from 'src/lib/graphql/enums/category.enums';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/lib/graphql/inputs/category.inputs';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DatabaseClient,

    @Inject(REQUEST) private gqlContext: { req: Request; res: Response },

    private readonly authService: AuthService<typeof auth>,
  ) {}

  public async getAll({
    monthDate,
    budgetId,
  }: {
    monthDate: Date;
    budgetId: string;
  }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    // Then get categories
    const results = (await this.db
      .select({
        ...getTableColumns(categoryTable),
        budget: { ...getTableColumns(budgetTable) },
        totalSpent: sql`COALESCE(sum(${transactionTable.amount}), 0)`.mapWith(
          Number,
        ),
      })
      .from(categoryTable)
      .leftJoin(
        transactionTable,
        eq(transactionTable.categoryId, categoryTable.id),
      )
      .innerJoin(budgetTable, eq(budgetTable.id, categoryTable.budgetId))
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(
        and(
          eq(userBudgetTable.userId, session!.user.id),
          budgetId
            ? eq(budgetTable.id, budgetId)
            : eq(budgetTable.isDefault, true),
          !monthDate
            ? undefined
            : lte(
                categoryTable.startDate,
                new Date(
                  monthDate.getUTCFullYear(),
                  monthDate.getUTCMonth() + 1,
                  0,
                ),
              ),
          !monthDate
            ? undefined
            : or(
                isNull(categoryTable.endDate),
                gte(
                  categoryTable.endDate,
                  new Date(
                    monthDate.getUTCFullYear(),
                    monthDate.getUTCMonth(),
                    1,
                  ),
                ),
              ),
        ),
      )
      .orderBy(asc(categoryTable.name))
      .groupBy((t) => [
        t.id,
        t.amount,
        t.budgetId,
        t.startDate,
        t.endDate,
        t.name,
        t.budget.id,
        t.budget.name,
        t.budget.isDefault,
      ])) as Category[];

    const otherCategoryTransactions = (
      await this.db
        .select({
          amount: sql`COALESCE(sum(${transactionTable.amount}), 0)`.mapWith(
            Number,
          ),
        })
        .from(transactionTable)
        .where(
          and(
            lte(
              transactionTable.date,
              new Date(
                monthDate.getUTCFullYear(),
                monthDate.getUTCMonth() + 1,
                0,
              ),
            ),
            gt(
              transactionTable.date,
              new Date(monthDate.getUTCFullYear(), monthDate.getUTCMonth(), 1),
            ),
          ),
        )
    )[0];

    if (otherCategoryTransactions?.amount > 0) {
      results.push({
        id: randomUUID(),
        budget: results[0].budget,
        budgetId: results[0].budgetId,
        name: 'Uncategorized',
        color: Color.BLUE,
        icon: Icon.ELLIPSIS,
        amount: 0,
        totalSpent: otherCategoryTransactions.amount,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: null,
      } as Category);
    }

    return results;
  }

  public async get({ id }: { id: string }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    const result = (
      await this.db
        .select({
          ...getTableColumns(categoryTable),
          budget: { ...getTableColumns(budgetTable) },
          totalSpent: this.db.$count(
            transactionTable,
            eq(transactionTable.categoryId, categoryTable.id),
          ),
        })
        .from(categoryTable)
        .innerJoin(budgetTable, eq(budgetTable.id, categoryTable.budgetId))
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(
          and(
            eq(categoryTable.id, id),
            eq(userBudgetTable.userId, session!.user.id),
          ),
        )
        .limit(1)
    )[0];

    return result as Category;
  }

  public async create({ input }: { input: CreateCategoryInput }) {
    const category = (
      await this.db
        .insert(categoryTable)
        .values({
          ...input,
          startDate: new Date(),
        })
        .returning({ id: categoryTable.id })
    )[0];

    const result = (
      await this.db
        .select({
          ...getTableColumns(categoryTable),
          budget: { ...getTableColumns(budgetTable) },
          totalSpent: this.db.$count(
            transactionTable,
            eq(transactionTable.categoryId, categoryTable.id),
          ),
        })
        .from(categoryTable)
        .innerJoin(budgetTable, eq(budgetTable.id, categoryTable.budgetId))
        .where(eq(categoryTable.id, category.id))
        .limit(1)
    )[0];

    return result;
  }

  public async update({ input }: { input: UpdateCategoryInput }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    const oldCategory = (
      await this.db
        .select(getTableColumns(categoryTable))
        .from(categoryTable)
        .innerJoin(budgetTable, eq(budgetTable.id, categoryTable.budgetId))
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(
          and(
            eq(categoryTable.id, input.id),
            eq(userBudgetTable.userId, session!.user.id),
          ),
        )
    )[0];

    if (!oldCategory) throw new Error('Invalid category id');

    let category: Pick<typeof categoryTable.$inferSelect, 'id'>;

    // If StartDate is < this month, create a new category and set the old end date to last month
    if (oldCategory.startDate < new Date(new Date().setDate(1))) {
      category = (
        await this.db
          .update(categoryTable)
          .set({
            name: input.name !== null ? input.name : undefined,
            amount: input.amount !== null ? input.amount : undefined,
          })
          .where(eq(categoryTable.id, oldCategory.id))
          .returning({ id: categoryTable.id })
      )[0];
    } else {
      await this.db.transaction(async (tx) => {
        await tx
          .update(categoryTable)
          .set({
            endDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1,
            ),
          })
          .where(eq(categoryTable.id, oldCategory.id));

        category = (
          await tx
            .insert(categoryTable)
            .values({
              name: input.name != null ? input.name : '',
              budgetId: oldCategory.budgetId,
              amount: input.amount != null ? input.amount : 0,
            })
            .returning({ id: categoryTable.id })
        )[0];
      });
    }

    const result = (
      await this.db
        .select({
          ...getTableColumns(categoryTable),
          budget: { ...getTableColumns(budgetTable) },
          totalSpent: this.db.$count(
            transactionTable,
            eq(transactionTable.categoryId, categoryTable.id),
          ),
        })
        .from(categoryTable)
        .innerJoin(budgetTable, eq(budgetTable.id, categoryTable.budgetId))
        .where(eq(categoryTable.id, category!.id))
        .limit(1)
    )[0];

    return result;
  }

  public async delete({ id }: { id: string }) {
    // Setting end dates will maintian categories for past months so that users can
    // view their history without it being altered from deleting categories in the future
    const category = await this.get({ id });
    if (
      !category ||
      (category?.endDate &&
        category?.endDate <
          new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    ) {
      // This prevents deleting categories that have already been ended
      throw new Error('Cannot find a category with that Id');
    }

    let result: Pick<typeof categoryTable.$inferSelect, 'id'>;
    if (category.startDate.getMonth() < new Date().getMonth()) {
      result = (
        await this.db
          .update(categoryTable)
          .set({
            endDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1,
            ),
          })
          .returning({ id: categoryTable.id })
      )[0];

      // Update any transactions at or after end date of category + 1 month (1st of that month), set to null
      await this.db
        .update(transactionTable)
        .set({ categoryId: null })
        .where(
          and(
            eq(transactionTable.id, result.id),
            gte(
              transactionTable.date,
              new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            ),
          ),
        );
    } else {
      // else if (startDate >= this month) then delete
      result = (
        await this.db
          .delete(categoryTable)
          .where(
            and(
              eq(categoryTable.budgetId, category.budget.id),
              eq(categoryTable.id, id),
            ),
          )
          .returning({ id: categoryTable.id })
      )[0];
    }

    return result.id;
  }
}
