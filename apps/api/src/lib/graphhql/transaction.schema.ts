import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from './utils.schema';
import { Bank } from './bank.schema';
import { type UUID } from 'node:crypto';
import { Category } from './category.schema';
import { TransactionSyncStatus } from './enums/transaction.enums';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  tellerId: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  description: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  type: string;

  @Field(() => Bank)
  bank: Bank;
  bankId: UUID;

  @Field(() => Category)
  category: Category;
  categoryId: UUID;
}

@ObjectType()
export class PaginatedTransactions extends Paginated(Transaction) {}

@ObjectType()
export class SyncTransactions {
  @Field(() => TransactionSyncStatus)
  status: (typeof TransactionSyncStatus)[keyof typeof TransactionSyncStatus];

  @Field(() => String, { nullable: true })
  error: string | null;
}
