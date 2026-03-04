import { type AxiosInstance } from 'axios';
import { BalanceResponse } from './types/balance.response';

export default class BalanceClient {
  private readonly axiosClient: AxiosInstance;
  private readonly accountId: string;

  constructor(
    accountId: string,
    {
      axiosClient,
    }: {
      axiosClient: AxiosInstance;
    },
  ) {
    this.axiosClient = axiosClient;
    this.accountId = accountId;
  }

  public async get() {
    return await this.axiosClient.get<BalanceResponse>(
      `/accounts/${this.accountId}/balances`,
    );
  }
}
