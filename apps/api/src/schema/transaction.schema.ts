import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { type UUID } from 'node:crypto';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  public id: UUID;

  @Field(() => String)
  public name: string;

  @Field(() => Float)
  public amount: number;
}
