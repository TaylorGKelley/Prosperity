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

  public async list(options: { accessToken: string }) {
    const response = await this.axiosClient.get<TransactionResponse[]>(
      `/accounts/${this.accountId}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${options.accessToken}`,
        },
      },
    );
    return response.data;
  }
}
