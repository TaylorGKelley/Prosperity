import { type AxiosInstance } from 'axios';

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
}
