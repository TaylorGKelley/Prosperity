import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { budgetTable } from './budget.schema';
import { relations } from 'drizzle-orm';
import { UUID } from 'node:crypto';
import { user } from 'src/lib/auth/schema';

export const userBudgetTable = pgTable(
  'user_budget',
  {
    userId: uuid('user_id')
      .$type<UUID>()
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    budgetId: uuid('budget_id')
      .$type<UUID>()
      .references(() => budgetTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.budgetId] })],
);

export const userBudgetRelations = relations(userBudgetTable, ({ one }) => ({
  user: one(user, {
    fields: [userBudgetTable.userId],
    references: [user.id],
  }),
  budget: one(budgetTable, {
    fields: [userBudgetTable.budgetId],
    references: [budgetTable.id],
  }),
}));
