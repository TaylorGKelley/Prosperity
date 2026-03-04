import { type AxiosInstance } from 'axios';
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

  public async list(params: Record<string, any> = {}) {
    return await this.axiosClient.get<TransactionResponse[]>(
      `/accounts/${this.accountId}/transactions${new URLSearchParams(params).toString()}`,
    );
  }
}
