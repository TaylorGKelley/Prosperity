import AccountClient from './account.client';
import BalanceClient from './balance.client';
import TransactionClient from './transaction.client';

export default class TellerClient {
  public accounts: AccountClient;
  public transactions: TransactionClient;
  public balances: BalanceClient;

  constructor({
    cert,
    key,
    applicationId,
  }: {
    cert: Buffer;
    key: Buffer;
    applicationId: string;
  }) {
    this.accounts = new AccountClient({ cert, key, applicationId });
    this.transactions = new TransactionClient({ cert, key, applicationId });
    this.balances = new BalanceClient({ cert, key, applicationId });
  }
}
