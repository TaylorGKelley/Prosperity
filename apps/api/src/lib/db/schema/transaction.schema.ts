import {
  date,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { categoryTable } from './category.schema';
import { bankTable } from './bank.schema';
import { relations } from 'drizzle-orm';
import { type UUID } from 'node:crypto';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'CASH',
  'DEBIT_CARD',
  'CREDIT_CARD',
  'BANK_TRANSFER',
  'CHECK',
  'GIFT_CARD',
]);

export const statusEnum = pgEnum('status', ['POSTED', 'PENDING']);

export type TransactionMetadata = {
  processingStatus: 'pending' | 'complete';
  category:
    | 'accommodation'
    | 'advertising'
    | 'bar'
    | 'charity'
    | 'clothing'
    | 'dining'
    | 'education'
    | 'electronics'
    | 'entertainment'
    | 'fuel'
    | 'general'
    | 'groceries'
    | 'health'
    | 'home'
    | 'income'
    | 'insurance'
    | 'investment'
    | 'loan'
    | 'office'
    | 'phone'
    | 'service'
    | 'shopping'
    | 'software'
    | 'sport'
    | 'tax'
    | 'transport'
    | 'transportation'
    | 'utilities';
  counterparty: {
    name: string | null;
    type: 'organization' | 'person';
  };
};

export const transactionTable = pgTable('transaction', {
  id: uuid('id').$type<UUID>().primaryKey().defaultRandom(),
  tellerId: varchar('teller_id', { length: 256 }).unique().notNull(),
  bankId: uuid('bank_id')
    .$type<UUID>()
    .references(() => bankTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  categoryId: uuid('category_id')
    .$type<UUID>()
    .references(() => categoryTable.id, {
      onDelete: 'set null',
    }),
  amount: real('amount').notNull(),
  date: date('date', { mode: 'date' }).notNull().defaultNow(),
  description: text('description').notNull(),
  status: statusEnum('status').notNull(),
  type: varchar('type', { length: 128 }).notNull(),
  metadata: jsonb('metadata').$type<TransactionMetadata>(),
});

export const transactionRelations = relations(transactionTable, ({ one }) => ({
  bank: one(bankTable, {
    fields: [transactionTable.bankId],
    references: [bankTable.id],
  }),
  category: one(categoryTable, {
    fields: [transactionTable.categoryId],
    references: [categoryTable.id],
  }),
}));
