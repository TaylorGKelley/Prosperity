import axios, { type AxiosInstance } from 'axios';
import https from 'node:https';
import AccountClient from './account.client';
import BalanceClient from './balance.client';
import TransactionClient from './transaction.client';

export default class TellerClient {
  static BASE_URL = 'https://api.teller.io' as const;
  private readonly axiosClient: AxiosInstance;
  private readonly applicationId: string;
  private readonly accessToken: string;

  constructor({
    cert,
    key,
    applicationId,
    accessToken,
  }: {
    cert: Buffer;
    key: Buffer;
    applicationId: string;
    accessToken: string;
  }) {
    this.axiosClient = axios.create({
      baseURL: TellerClient.BASE_URL,
      httpsAgent: new https.Agent({
        cert,
        key,
      }),
      headers: {
        'Teller-Version': '2020-10-12',
        'User-Agent': 'Prosperity/2.0.0',
        Authorization: `Basic ${Buffer.from(`${this.accessToken}:`).toString(
          'base64',
        )}`,
      },
    });
    this.applicationId = applicationId;
    this.accessToken = accessToken;
  }

  get accounts() {
    const accountClient = new AccountClient({ axiosClient: this.axiosClient });

    const fn = (accountId: string) => ({
      transactions: new TransactionClient(accountId, {
        axiosClient: this.axiosClient,
      }),
      balances: new BalanceClient(accountId, {
        axiosClient: this.axiosClient,
      }),
    });

    return Object.assign(fn, accountClient);
  }
}
