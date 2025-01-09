import * as bcrypt from 'bcrypt';

export async function hashPassword(raw_password: string): Promise<string> {
  const saltRounds = bcrypt.genSaltSync();
  return await bcrypt.hash(raw_password, saltRounds);
}
