import * as bcrypt from 'bcrypt';

export async function compare_password(
  raw_password: string,
  hashPassword: string,
) {
  return await bcrypt.compare(raw_password, hashPassword);
}
