export default class AccountClient {
  private readonly TELLER_URL = 'https://api.teller.io';
  private readonly cert: Buffer;
  private readonly key: Buffer;
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
    this.cert = cert;
    this.key = key;
    this.applicationId = applicationId;
  }
}
