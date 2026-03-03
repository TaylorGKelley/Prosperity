import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Color } from './enums/category.enums';
import { type UUID } from 'node:crypto';

@ObjectType()
export class Budget {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  name: string;

  @Field(() => Color)
  color: (typeof Color)[keyof typeof Color];

  @Field(() => Boolean)
  isDefault: boolean;
}
