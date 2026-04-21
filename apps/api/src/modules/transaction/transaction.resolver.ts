import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import {
  PaginatedTransactions,
  SyncTransactions,
  Transaction,
} from 'src/lib/graphhql/transaction.schema';
import { PaginationInput } from 'src/lib/graphhql/inputs/utils.inputs';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => PaginatedTransactions)
  public async transactions(
    @Args('pagination') pagination: PaginationInput,
    @Args('monthDate') monthDate: Date,
    @Args('budgetId') budgetId: string,
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
