import { z } from 'zod';

export const CreateProductSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  sku: z.string().nonempty(),
  price: z.number().positive(),
  features: z.array(z.string()).optional(),
  url_source: z.string().nonempty(),
  specifications: z.string().nonempty(),
  images: z.array(z.string()).nonempty(),
  warranty: z.string().optional(),
  deliveryInfo: z.string().optional(),
  categoryId: z.string().nonempty(),
  brandId: z.string().optional(),
});

export type UpdateProductDto = z.infer<typeof CreateProductSchema>;
