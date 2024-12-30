import { z } from 'zod';

export const CreateBrandSchema = z.object({
  name: z.string().nonempty(),
});

export type CreateBrandDto = z.infer<typeof CreateBrandSchema>;
