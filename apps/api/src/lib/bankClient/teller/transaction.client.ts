import { type AxiosInstance } from 'axios';
import https from 'node:https';
import { TransactionResponse } from './types/transaction.response';

export default class TransactionClient {
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

  public async list() {
    const response = await this.axiosClient.get<TransactionResponse[]>(
      `/accounts/${this.accountId}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${this.applicationId}`,
        },
      },
    );
    return response.data;
  }
}
