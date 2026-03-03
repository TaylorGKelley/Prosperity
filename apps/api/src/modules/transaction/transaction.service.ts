import { Inject, Injectable } from '@nestjs/common';
import {
  BANK_CLIENT,
  type BankClient,
} from 'src/lib/bankClient/bankClient.module';
import {
  DATABASE_CONNECTION,
  type DatabaseClient,
} from 'src/lib/db/database.module';
import { Transaction } from 'src/lib/graphhql/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: DatabaseClient,

    @Inject(BANK_CLIENT)
    private bankClient: BankClient,
  ) {}

  public async getAll(): Promise<Transaction[]> {
    const result = await this.db.query.transactionTable.findMany();
    // const teller = await this.bankClient.accounts().transactions.list();

    return result as unknown as Transaction[];
  }
}
