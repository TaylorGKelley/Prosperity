import { registerAs } from '@nestjs/config';

export const BANK_CLIENT = Symbol.for('BANK_CLIENT');

export default registerAs(BANK_CLIENT, () => {
  const certBase64 = process.env.TELLER_CERT_BASE64;
  const keyBase64 = process.env.TELLER_KEY_BASE64;

  if (!certBase64 || !keyBase64 || !process.env.TELLER_APPLICATION_ID) {
    throw new Error(
      'Teller certificates or application id are missing from environment variables',
    );
  }

  return {
    // Decode Base64 to a Buffer/String for the HTTPS Agent
    certificate: Buffer.from(certBase64, 'base64').toString('utf-8'),
    privateKey: Buffer.from(keyBase64, 'base64').toString('utf-8'),
    applicationId: process.env.TELLER_APPLICATION_ID,
  };
});
