import crypto from 'node:crypto';

const algorithm: crypto.CipherGCMTypes = 'aes-256-gcm' as const;

export function encrypt(token: string) {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(
    algorithm,
    process.env.ACCOUNT_ACCESS_TOKEN_KEY!,
    iv,
  );

  const encryptedToken = Buffer.concat([cipher.update(token), cipher.final()]);

  const authTag = cipher.getAuthTag();

  return {
    iv: `${iv.toString('hex')}##${authTag.toString('hex')}`,
    encryptedToken: encryptedToken.toString('hex'),
  };
}

export function decrypt(encryptedToken: string, iv: string) {
  const [encryptIV, authTag] = iv.split('##');

  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.ACCOUNT_ACCESS_TOKEN_KEY!,
    Buffer.from(encryptIV, 'hex'),
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  const decrpyted =
    decipher.update(encryptedToken, 'hex', 'utf-8') + decipher.final('utf-8');
  return decrpyted.toString();
}
