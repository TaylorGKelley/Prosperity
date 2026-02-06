import { Field, ID, ObjectType } from '@nestjs/graphql';
import { type UUID } from 'node:crypto';

@ObjectType()
export default class Account {
  @Field(() => ID)
  id: UUID;

  @Field(() => String)
  tellerId: string;
}
