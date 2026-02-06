import { type AxiosInstance } from 'axios';

export default class AccountClient {
  private readonly axiosClient: AxiosInstance;

  constructor({ axiosClient }: { axiosClient: AxiosInstance }) {
    this.axiosClient = axiosClient;
  }
}
