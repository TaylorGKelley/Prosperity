import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from './utils.schema';
import Bank from './bank.schema';
import { type UUID } from 'node:crypto';
import { Category } from './category.schema';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  tellerId: string;

  @Field(() => String)
  name: string;

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
}

export class PaginatedTransactions extends Paginated(Transaction) {}
