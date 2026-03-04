import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Color, Icon } from './enums/category.enums';

import { Budget } from './budget.schema';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

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

  @Field(() => Date, { nullable: true })
  endDate: Date | null;

  @Field(() => Budget)
  budget: Budget;
  budgetId: string;
}
