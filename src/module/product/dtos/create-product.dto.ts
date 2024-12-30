import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  price: z.number().positive(),
  sku: z.string().nonempty(),
  features: z.array(z.string()).optional(),
  specifications: z.string().nonempty(),
  images: z.array(z.string()).nonempty(),
  warranty: z.string().optional(),
  deliveryInfo: z.string().optional(),
  categoryId: z.string().nonempty(),
  brandId: z.string().optional(),
  url_source: z.string().nonempty(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
