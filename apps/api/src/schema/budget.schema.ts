import { Field, ID, ObjectType } from '@nestjs/graphql';
import { type UUID } from 'node:crypto';

@ObjectType()
export class Budget {
  @Field(() => ID)
  public id: UUID;

  @Field(() => String)
  public name: string;
}
