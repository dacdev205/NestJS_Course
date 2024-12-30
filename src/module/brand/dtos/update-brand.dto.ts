import { z } from 'zod';

export const UpdateBrandSchema = z.object({
  name: z.string().optional(),
});

export type UpdateBrandDto = z.infer<typeof UpdateBrandSchema>;
