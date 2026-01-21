import { Injectable } from '@nestjs/common';
import { Transaction } from '../../entities/transaction.entity';

@Injectable()
export class TransactionService {
  public async getTransactions(): Promise<Transaction[]> {
    await Promise.resolve();

    return [
      { id: '0d8bb298-c0cf-4552-8db2-183a8f7128ac', name: 'test', amount: 0.0 },
    ];
  }
}
