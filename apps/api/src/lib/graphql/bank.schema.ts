import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { Color } from './enums/category.enums';
import { BankStatus, BankSubtype, BankType } from './enums/bank.enums';
import { Budget } from './budget.schema';
import { Institution } from './utils.schema';

@ObjectType()
export class Bank {
  @Field(() => ID)
  id: string;

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
  budgetId: string;
}
