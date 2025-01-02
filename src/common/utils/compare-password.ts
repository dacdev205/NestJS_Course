import * as bcrypt from 'bcrypt';

export function compare_password(raw_password: string, hashPassword: string) {
  return bcrypt.compareSync(raw_password, hashPassword);
}
