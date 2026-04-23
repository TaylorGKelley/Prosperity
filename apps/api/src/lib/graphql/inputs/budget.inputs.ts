import { Field, ID, InputType } from '@nestjs/graphql';
import { Color } from '../enums/category.enums';

@InputType()
export class CreateBudgetInput {
  @Field(() => String)
  name: string;

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => Boolean)
  isDefault: boolean;
}

@InputType()
export class UpdateBudgetInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => Boolean, { nullable: true })
  isDefault: boolean | null;
}
