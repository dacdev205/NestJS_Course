import { z } from 'zod';

export const CreateBrandSchema = z.object({
  name: z.string().min(3, { message: 'Name is required!' }),
});
