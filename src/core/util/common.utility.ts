import { pbkdf2Sync, randomBytes } from 'crypto';

export class CommonUtility {
  public static encryptBySalt(
    input: string,
    salt = randomBytes(16).toString('hex'),
  ) {
    const hash = pbkdf2Sync(input, salt, 100, 64, 'sha256').toString('hex');
    return { hash, salt };
  }
}
