import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { type UUID } from 'node:crypto';
import { Color } from './enums/category.enums';
import {
  AccountStatus,
  AccountSubtype,
  AccountType,
} from './enums/account.enums';
import { Budget } from './budget.schema';

@ObjectType()
export default class Account {
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

  @Field(() => AccountType)
  type: (typeof AccountType)[keyof typeof AccountType];

  @Field(() => AccountSubtype)
  subtype: (typeof AccountSubtype)[keyof typeof AccountSubtype];

  @Field(() => AccountStatus)
  status: (typeof AccountStatus)[keyof typeof AccountStatus];

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
