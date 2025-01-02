import { z } from 'zod';

export const SignUpSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  phone: z.string().max(10).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8).nonempty(),
});

export type SignUpDto = z.infer<typeof SignUpSchema>;
