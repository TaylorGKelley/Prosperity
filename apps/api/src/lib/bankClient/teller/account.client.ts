import { type AxiosInstance } from 'axios';
import { type AccountResponse } from './types/account.response';

export default class AccountClient {
  private readonly axiosClient: AxiosInstance;

  constructor({ axiosClient }: { axiosClient: AxiosInstance }) {
    this.axiosClient = axiosClient;
  }

  public async list() {
    return await this.axiosClient.get<AccountResponse[]>('/accounts');
  }

  public async get(accountId: string) {
    return await this.axiosClient.get<AccountResponse>(
      `/accounts/${accountId}`,
    );
  }

  public async delete(accountId: string) {
    return await this.axiosClient.delete<unknown>(`/accounts/${accountId}`);
  }
}
