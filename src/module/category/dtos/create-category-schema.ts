import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string().nonempty(),
});

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
