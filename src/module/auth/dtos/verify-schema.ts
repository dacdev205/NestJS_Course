import { z } from 'zod';

export const VerifyAccountSchema = z.object({
  id: z.string().nonempty(),
  code_id: z.string().nonempty(),
});

export type VerifyAccountDto = z.infer<typeof VerifyAccountSchema>;
