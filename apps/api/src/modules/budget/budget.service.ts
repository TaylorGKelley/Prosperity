import { Inject, Injectable } from '@nestjs/common';
import { eq, and, not } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';
import { type UUID } from 'node:crypto';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import { budgetTable, userBudgetTable } from 'src/lib/db/schema/schema';
import { Budget } from 'src/lib/graphhql/budget.schema';

@Injectable()
export class BudgetService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: DatabaseClient,
  ) {}

  public async getAll(): Promise<Budget[]> {
    const results = await this.db
      .select(getTableColumns(budgetTable))
      .from(budgetTable)
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(eq(userBudgetTable.userId, this._userId));

    return results.map((result) => ({
      ...result,
      color:
        ColorEnum[snakeToPascalCase(result.color) as keyof typeof ColorEnum],
    }));
  }

  public async get({ id }) {
    const result = (
      await this.db
        .select(getTableColumns(budgetTable))
        .from(budgetTable)
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(
          and(eq(budgetTable.id, id), eq(userBudgetTable.userId, this._userId)),
        )
    )[0];

    return {
      ...result,
      color:
        ColorEnum[snakeToPascalCase(result.color) as keyof typeof ColorEnum],
    };
  }

  public async create({ input }) {
    let result: typeof budgetTable.$inferSelect;
    await this.db.transaction(async (tx) => {
      result = (
        await tx
          .insert(budgetTable)
          .values({
            name: input.name,
            isDefault: input.isDefault || undefined,
          })
          .returning()
      )[0];

      if (input.isDefault) {
        // set all other budgets to not be default
        await tx
          .update(budgetTable)
          .set({
            isDefault: false,
          })
          .where(not(eq(budgetTable.id, result.id)));
      }

      await tx
        .insert(userBudgetTable)
        .values({ userId: this._userId, budgetId: result.id });
    });

    return {
      ...result!,
      color:
        ColorEnum[snakeToPascalCase(result!.color) as keyof typeof ColorEnum],
    };
  }

  public async update({ input }) {
    let result: typeof budgetTable.$inferSelect;
    await this.db.transaction(async (tx) => {
      // Update budget information
      result = (
        await tx
          .update(budgetTable)
          .set({
            name: input.name || undefined,
            isDefault: input.isDefault || undefined,
          })
          .where(eq(budgetTable.id, input.id))
          .returning()
      )[0];

      if (input.isDefault) {
        // set all other budgets to not be default
        await tx
          .update(budgetTable)
          .set({
            isDefault: false,
          })
          .where(not(eq(budgetTable.id, result.id)));
      }
    });

    return {
      ...result!,
      color:
        ColorEnum[snakeToPascalCase(result!.color) as keyof typeof ColorEnum],
    };
  }

  public async delete({ id }) {
    const result = (
      await this.db
        .delete(budgetTable)
        .where(eq(budgetTable.id, id))
        .returning({ id: budgetTable.id })
    )[0];

    return result.id as UUID;
  }
}
