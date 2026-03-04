import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Color } from './enums/category.enums';

@ObjectType()
export class Budget {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => Boolean)
  isDefault: boolean;
}
