import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { eq, and, getTableColumns } from 'drizzle-orm';

import { auth } from 'src/lib/auth/auth';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import {
  budgetTable,
  savingGoalTable,
  userBudgetTable,
} from 'src/lib/db/schema/schema';
import {
  CreateSavingGoalInput,
  UpdateSavingGoalInput,
} from 'src/lib/graphhql/inputs/savingGoal.inputs';
import { SavingGoal } from 'src/lib/graphhql/savingGoal.schema';

@Injectable()
export class SavingGoalService {
  private readonly _savingGoalColumns = {
    ...getTableColumns(savingGoalTable),
    budget: { ...getTableColumns(budgetTable) },
  };

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: DatabaseClient,

    @Inject(REQUEST) private gqlContext: { req: Request; res: Response },

    private readonly authService: AuthService<typeof auth>,
  ) {}

  public async getAll({ budgetId }: { budgetId: string }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    const results = await this.db
      .select(this._savingGoalColumns)
      .from(savingGoalTable)
      .innerJoin(budgetTable, eq(budgetTable.id, savingGoalTable.budgetId))
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(
        and(
          eq(userBudgetTable.userId, session!.user.id),
          budgetId
            ? eq(budgetTable.id, budgetId)
            : eq(budgetTable.isDefault, true),
        ),
      );

    return results;
  }

  public async get({ id }: { id: string }) {
    const session = await this.authService.api.getSession({
      headers: this.gqlContext.req.headers,
    });

    const result = (
      await this.db
        .select(this._savingGoalColumns)
        .from(savingGoalTable)
        .innerJoin(budgetTable, eq(budgetTable.id, savingGoalTable.budgetId))
        .innerJoin(
          userBudgetTable,
          eq(userBudgetTable.budgetId, budgetTable.id),
        )
        .where(
          and(
            eq(savingGoalTable.id, id),
            eq(userBudgetTable.userId, session!.user.id),
          ),
        )
    )[0];

    return result;
  }

  public async create({ input }: { input: CreateSavingGoalInput }) {
    const result = (
      await this.db
        .insert(savingGoalTable)
        .values(input)
        .returning({ id: savingGoalTable.id })
    )[0];

    return (
      await this.db
        .select(this._savingGoalColumns)
        .from(savingGoalTable)
        .innerJoin(budgetTable, eq(budgetTable.id, savingGoalTable.budgetId))
        .where(eq(savingGoalTable.id, result.id))
    )[0] as SavingGoal;
  }

  public async update({ input }: { input: UpdateSavingGoalInput }) {
    const result = (
      await this.db
        .update(savingGoalTable)
        .set({
          title: input.title || undefined,
          contributionAmount: input.contributionAmount || undefined,
          targetAmount: input.targetAmount || undefined,
          prioritize: input.prioritize || undefined,
        })
        .where(eq(savingGoalTable.id, input.id))
        .returning({ id: savingGoalTable.id })
    )[0];

    return (
      await this.db
        .select(this._savingGoalColumns)
        .from(savingGoalTable)
        .innerJoin(budgetTable, eq(budgetTable.id, savingGoalTable.budgetId))
        .where(eq(savingGoalTable.id, result.id))
    )[0] as SavingGoal;
  }

  public async delete({ id }: { id: string }) {
    const result = (
      await this.db
        .delete(savingGoalTable)
        .where(eq(savingGoalTable.id, id))
        .returning({ id: savingGoalTable.id })
    )[0];

    return result.id;
  }
}
