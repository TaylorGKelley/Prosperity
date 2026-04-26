import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { BankService } from './bank.service';
import { CreateAccountInput } from 'src/lib/graphql/inputs/bank.inputs';
import { Bank } from 'src/lib/graphql/bank.schema';

@Resolver()
export class BankResolver {
  constructor(private readonly bankService: BankService) {}

  @Query(() => [Bank])
  public async banks(@Args('budgetId') budgetId: string) {
    return await this.bankService.getAll({ budgetId });
  }

  @Query(() => Bank)
  public async bank(@Args('id') id: string) {
    const bank = await this.bankService.get({ id });

    if (!bank) throw new Error('Cannot find a bank with that Id');

    return bank;
  }

  @Mutation(() => Bank)
  public async createBank(@Args('input') input: CreateAccountInput) {
    return await this.bankService.create({ input });
  }

  @Mutation(() => Bank)
  public async deleteBank(@Args('id') id: string) {
    return await this.bankService.delete({ id });
  }
}
