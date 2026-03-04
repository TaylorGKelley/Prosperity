import { Field, ID, InputType } from '@nestjs/graphql';
import { PaginationInput } from './utils.inputs';

@InputType()
export class GetTransactionsInput {
  @Field(() => Date)
  monthDate: Date;

  @Field(() => PaginationInput)
  pagination: PaginationInput;

  @Field(() => ID)
  budgetId: string;
}
