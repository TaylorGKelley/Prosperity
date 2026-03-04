import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Int)
  count: number;
}
