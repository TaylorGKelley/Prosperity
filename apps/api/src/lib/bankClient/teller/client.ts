import axios, { type AxiosInstance } from 'axios';
import https from 'node:https';
import AccountClient from './account.client';
import BalanceClient from './balance.client';
import TransactionClient from './transaction.client';

export default class TellerClient {
  static BASE_URL = 'https://api.teller.io' as const;
  private readonly axiosClient: AxiosInstance;
  private readonly applicationId: string;

  constructor({
    cert,
    key,
    applicationId,
  }: {
    cert: Buffer;
    key: Buffer;
    applicationId: string;
  }) {
    this.axiosClient = axios.create({
      baseURL: TellerClient.BASE_URL,
      httpsAgent: new https.Agent({
        cert,
        key,
      }),
    });
    this.applicationId = applicationId;

    (this.accounts as any) = (accountId: string) => ({
      transactions: new TransactionClient(accountId, {
        axiosClient: this.axiosClient,
      }),
      balances: new BalanceClient(accountId, {
        axiosClient: this.axiosClient,
      }),
    });

    const accountClient = new AccountClient({ axiosClient: this.axiosClient });
    Object.entries(accountClient).forEach(([key, value]) => {
      this.accounts[key] = value as AccountClient[keyof AccountClient];
    });
  }

  public accounts: AccountClient &
    ((accountId: string) => {
      transactions: TransactionClient;
      balances: BalanceClient;
    });
}
