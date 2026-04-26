import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { eq, and, not } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';

import { auth } from 'src/lib/auth/auth';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import { budgetTable, userBudgetTable } from 'src/lib/db/schema/schema';
import { Budget } from 'src/lib/graphql/budget.schema';
import {
  CreateBudgetInput,
  UpdateBudgetInput,
} from 'src/lib/graphql/inputs/budget.inputs';

@Injectable()
export class BudgetService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DatabaseClient,

    @Inject(REQUEST) private gqlContext: { req: Request; res: Response },

    private readonly authService: AuthService<typeof auth>,
  ) {}

  public async getAll(): Promise<Budget[]> {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    const results = await this.db
      .select(getTableColumns(budgetTable))
      .from(budgetTable)
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(eq(userBudgetTable.userId, session!.user.id));

    return results;
  }

  public async get({ id }: { id: string }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    const result = (
      await this.db
        .select(getTableColumns(budgetTable))
        .from(budgetTable)
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(
          and(
            eq(budgetTable.id, id),
            eq(userBudgetTable.userId, session!.user.id),
          ),
        )
    )[0];

    return result;
  }

  public async create({ input }: { input: CreateBudgetInput }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

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
        .values({ userId: session!.user.id, budgetId: result.id });
    });

    return result!;
  }

  public async update({ input }: { input: UpdateBudgetInput }) {
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

    return result!;
  }

  public async delete({ id }: { id: string }) {
    const result = (
      await this.db
        .delete(budgetTable)
        .where(eq(budgetTable.id, id))
        .returning({ id: budgetTable.id })
    )[0];

    return result.id;
  }
}
