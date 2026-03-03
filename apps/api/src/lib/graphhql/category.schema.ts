import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Color, Icon } from './enums/category.enums';
import { type UUID } from 'node:crypto';
import { Budget } from './budget.schema';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  name: string;

  @Field(() => Icon)
  icon: (typeof Icon)[keyof typeof Icon];

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Budget)
  budget: Budget;
  budgetId: UUID;
}
