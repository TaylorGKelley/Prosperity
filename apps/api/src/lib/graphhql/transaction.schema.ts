import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  description: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  type: string;
}
