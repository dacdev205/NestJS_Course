import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    email: z.string().email().nonempty(),
    old_password: z.string().min(8).nonempty(),
    new_password: z.string().min(8).nonempty(),
  })
  .strict();
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
