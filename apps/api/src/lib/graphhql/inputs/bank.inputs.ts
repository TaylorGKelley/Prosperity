import { Field, ID, InputType } from '@nestjs/graphql';
import { Color } from '../enums/category.enums';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  accessToken: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => ID)
  id: string;

  @Field(() => Color, { nullable: true })
  color: (typeof Color)[keyof typeof Color] | null;
}
