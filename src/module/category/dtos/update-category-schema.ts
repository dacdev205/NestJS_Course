import { z } from 'zod';

export const UpdateCategorySchema = z.object({
  name: z.string().nonempty().optional(),
});

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
