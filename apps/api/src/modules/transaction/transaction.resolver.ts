import { Query, Resolver } from '@nestjs/graphql';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [Transaction])
  public async getTransactions() {
    return this.transactionService.getTransactions();
  }
}
