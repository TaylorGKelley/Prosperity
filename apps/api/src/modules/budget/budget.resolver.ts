import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { BudgetService } from './budget.service';
import {
  CreateBudgetInput,
  UpdateBudgetInput,
} from 'src/lib/graphhql/inputs/budget.inputs';
import { Budget } from 'src/lib/graphhql/budget.schema';

@Resolver()
export class BudgetResolver {
  constructor(private readonly budgetService: BudgetService) {}

  @Query(() => [Budget])
  public async budgets() {
    return await this.budgetService.getAll();
  }

  @Query(() => Budget)
  public async budget(@Args('id') id: string) {
    const budget = await this.budgetService.get({ id });

    if (!budget) throw new Error('Cannot find a budget with that Id');

    return budget;
  }

  @Mutation(() => Budget)
  public async createBudget(@Args('input') input: CreateBudgetInput) {
    return await this.budgetService.create({ input });
  }

  @Mutation(() => Budget)
  public async updateBudget(@Args('input') input: UpdateBudgetInput) {
    return await this.budgetService.update({ input });
  }

  @Mutation(() => Budget)
  public async deleteBudget(@Args('id') id: string) {
    return await this.budgetService.delete({ id });
  }
}
