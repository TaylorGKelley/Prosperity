import { Field, Float, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSavingGoalInput {
  @Field(() => ID)
  budgetId: string;

  @Field(() => String)
  title: string;

  @Field(() => Float)
  targetAmount: number;

  @Field(() => Float)
  contributionAmount: number;

  @Field(() => Boolean)
  prioritize: boolean;
}

@InputType()
export class UpdateSavingGoalInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  title: string | null;

  @Field(() => Float, { nullable: true })
  targetAmount: number | null;

  @Field(() => Float, { nullable: true })
  contributionAmount: number | null;

  @Field(() => Boolean, { nullable: true })
  prioritize: boolean | null;
}
