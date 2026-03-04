import { Inject, Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { type UUID } from 'node:crypto';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import {
  budgetTable,
  savingGoalTable,
  userBudgetTable,
} from 'src/lib/db/schema/schema';
import { SavingGoal } from 'src/lib/graphhql/savingGoal.schema';

@Injectable()
export class SavingGoalService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: DatabaseClient,
  ) {}

  public async getAll({
    budgetId,
  }: QuerySavingGoalsArgs): Promise<SavingGoal[]> {
    const results = await this.db
      .select(this._savingGoalColumns)
      .from(savingGoalTable)
      .innerJoin(budgetTable, eq(budgetTable.id, savingGoalTable.budgetId))
      .innerJoin(userBudgetTable, eq(userBudgetTable.budgetId, budgetTable.id))
      .where(
        and(
          eq(userBudgetTable.userId, this._userId),
          budgetId
            ? eq(budgetTable.id, budgetId)
            : eq(budgetTable.isDefault, true),
        ),
      );

    return results.map(
      (result) =>
        ({
          ...result,
          color:
            ColorEnum[
              snakeToPascalCase(result.color) as keyof typeof ColorEnum
            ],
          icon: IconEnum[
            snakeToPascalCase(result.icon) as keyof typeof IconEnum
          ],
        }) as SavingGoal,
    );
  }

  public async get({ id }) {
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
            eq(userBudgetTable.userId, this._userId),
          ),
        )
    )[0];

    return (
      result &&
      ({
        ...result,
        color:
          ColorEnum[snakeToPascalCase(result.color) as keyof typeof ColorEnum],
        icon: IconEnum[snakeToPascalCase(result.icon) as keyof typeof IconEnum],
      } as SavingGoal)
    );
  }

  public async create({ input }) {
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

  public async update({ input }) {
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

  public async delete({ id }): Promise<UUID> {
    const result = (
      await this.db
        .delete(savingGoalTable)
        .where(eq(savingGoalTable.id, id))
        .returning({ id: savingGoalTable.id })
    )[0];

    return result.id as UUID;
  }
}
