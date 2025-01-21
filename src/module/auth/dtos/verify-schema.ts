import { z } from 'zod';

export const VerifyAccountSchema = z
  .object({
    email: z.string().nonempty(),
    code_id: z.string().nonempty(),
  })
  .strict();

export type VerifyAccountDto = z.infer<typeof VerifyAccountSchema>;
