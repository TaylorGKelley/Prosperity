import { relations } from 'drizzle-orm';
import { boolean, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { categoryTable, colorEnum } from './category.schema';
import { savingGoalTable } from './savingGoal.schema';
import { bankTable } from './bank.schema';
import { userBudgetTable } from './userBudget.schema';
import { type UUID } from 'node:crypto';

export const budgetTable = pgTable(
  'budget',
  {
    id: uuid('id').$type<UUID>().primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull(),
    color: colorEnum('color')
      .notNull()
      .default(
        colorEnum.enumValues[
          Math.floor(Math.random() * colorEnum.enumValues.length)
        ],
      ),
    isDefault: boolean('is_default').notNull().default(false),
  },
  (table) => [unique().on(table.id), unique().on(table.name)],
);

export const budgetRelations = relations(budgetTable, ({ many }) => ({
  categories: many(categoryTable),
  savingGoals: many(savingGoalTable),
  banks: many(bankTable),
  userBudgets: many(userBudgetTable),
}));
