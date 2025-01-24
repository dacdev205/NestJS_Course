import { z } from 'zod';

export const ResetPassSchema = z
  .object({
    email: z.string().email().nonempty(),
    code_id: z.string().nonempty(),
    new_password: z.string().min(8).nonempty(),
  })
  .strict();
export type ResetPassDto = z.infer<typeof ResetPassSchema>;
