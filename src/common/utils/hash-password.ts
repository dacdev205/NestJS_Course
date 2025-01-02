import * as bcrypt from 'bcrypt';
export function hashPassword(raw_password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(raw_password, salt);
}
