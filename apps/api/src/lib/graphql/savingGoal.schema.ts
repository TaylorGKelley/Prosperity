import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Color, Icon } from './enums/category.enums';

import { Budget } from './budget.schema';

@ObjectType()
export class SavingGoal {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Icon)
  icon: (typeof Icon)[keyof typeof Icon];

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => Float)
  targetAmount: number;

  @Field(() => Float)
  currentAmount: number;

  @Field(() => Float)
  contributionAmount: number;

  @Field(() => Date)
  lastContribution: Date;

  @Field(() => Boolean)
  prioritize: boolean;

  @Field(() => Budget)
  budget: Budget;
}
