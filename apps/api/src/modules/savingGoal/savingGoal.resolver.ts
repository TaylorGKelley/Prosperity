import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SavingGoalService } from './savingGoal.service';
import { SavingGoal } from 'src/lib/graphhql/savingGoal.schema';
import {
  CreateSavingGoalInput,
  UpdateSavingGoalInput,
} from 'src/lib/graphhql/inputs/savingGoal.inputs';

@Resolver()
export class SavingGoalResolver {
  constructor(private readonly savingGoalService: SavingGoalService) {}

  @Query(() => [SavingGoal])
  public async savingGoals(@Args('budgetId') budgetId: string) {
    return await this.savingGoalService.getAll({ budgetId });
  }

  @Query(() => SavingGoal)
  public async savingGoal(@Args('id') id: string) {
    const savingGoal = await this.savingGoalService.get({ id });

    if (!savingGoal) throw new Error('Cannot find a savingGoal with that Id');

    return savingGoal;
  }

  @Mutation(() => SavingGoal)
  public async createSavingGoal(@Args('input') input: CreateSavingGoalInput) {
    return await this.savingGoalService.create({ input });
  }

  @Mutation(() => SavingGoal)
  public async updateSavingGoal(@Args('input') input: UpdateSavingGoalInput) {
    return await this.savingGoalService.update({ input });
  }

  @Mutation(() => SavingGoal)
  public async deleteSavingGoal(@Args('id') id: string) {
    return await this.savingGoalService.delete({ id });
  }
}
