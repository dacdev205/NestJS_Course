import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string().min(3, { message: 'Name is required!' }),
  discription: z.string().min(3, { message: 'Discription is required!' }),
});
export type CreateCategorySchema = z.infer<typeof CreateCategorySchema>;
