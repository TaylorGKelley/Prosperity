import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { Color, Icon } from '../enums/category.enums';

@InputType()
export class CreateCategoryInput {
  @Field(() => ID)
  budgetId: string;

  @Field(() => String)
  name: string;

  @Field(() => Icon)
  icon: (typeof Icon)[keyof typeof Icon];

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => Float)
  amount: number;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => Icon, { nullable: true })
  icon: (typeof Icon)[keyof typeof Icon] | null;

  @Field(() => Color, { nullable: true })
  color: (typeof Color)[keyof typeof Color] | null;

  @Field(() => Float, { nullable: true })
  amount: number | null;
}
