import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { type UUID } from 'node:crypto';
import { Color } from './enums/category.enums';
import { BankStatus, BankSubtype, BankType } from './enums/bank.enums';
import { Budget } from './budget.schema';

@ObjectType()
export default class Bank {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  tellerId: string;

  @Field(() => Float)
  balance: number;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  enrollmentId: string;

  @Field(() => Institution)
  institution: Institution;

  @Field(() => Int)
  lastFour: number;

  @Field(() => String)
  name: string;

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => BankType)
  type: (typeof BankType)[keyof typeof BankType];

  @Field(() => BankSubtype)
  subtype: (typeof BankSubtype)[keyof typeof BankSubtype];

  @Field(() => BankStatus)
  status: (typeof BankStatus)[keyof typeof BankStatus];

  @Field(() => Budget)
  budget: Budget;
  budgetId: UUID;
}

@ObjectType()
export class Institution {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  name: string;
}
