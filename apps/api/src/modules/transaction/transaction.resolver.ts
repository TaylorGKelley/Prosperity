import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import {
  SyncTransactions,
  Transaction,
} from 'src/lib/graphhql/transaction.schema';
import { GetTransactionsInput } from 'src/lib/graphhql/inputs/transaction.inputs';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [Transaction])
  public async transactions(
    @Args('input')
    { monthDate, pagination, budgetId }: GetTransactionsInput,
  ) {
    return this.transactionService.getAll({ monthDate, pagination, budgetId });
  }

  @Query(() => Transaction)
  public async transaction(@Args('id') id: string) {
    return this.transactionService.get({ id });
  }

  @Mutation(() => SyncTransactions)
  public async syncTransactions() {
    return this.transactionService.sync();
  }

  @Mutation(() => String)
  public async deleteTransaction(@Args('id') id: string) {
    return this.transactionService.delete({ id });
  }
}
