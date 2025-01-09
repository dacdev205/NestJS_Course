import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8).nonempty(),
});

export type SignInDto = z.infer<typeof SignInSchema>;
