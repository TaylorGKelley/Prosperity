import { Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from 'src/lib/graphhql/transaction.schema';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [Transaction])
  public async transactions() {
    return this.transactionService.getAll();
  }
}
