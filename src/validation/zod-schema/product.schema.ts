import { z } from 'zod';

export const CreateProductSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long.' }),
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  sku: z
    .string()
    .min(3, { message: 'SKU must be at least 3 characters long.' }),
  features: z
    .array(z.string().min(1))
    .min(1, { message: 'At least one feature is required.' }),
  specifications: z
    .string()
    .min(3, { message: 'Specifications must be at least 3 characters long.' }),
  images: z
    .array(z.string().url({ message: 'Invalid image URL.' }))
    .min(1, { message: 'At least one image is required.' }),
  warranty: z.string().min(3, {
    message: 'Warranty details must be at least 3 characters long.',
  }),
  deliveryInfo: z.string().min(3, {
    message: 'Delivery information must be at least 3 characters long.',
  }),
  categoryId: z.string().uuid({ message: 'Invalid Category ID.' }),
  brandId: z.string().uuid({ message: 'Invalid Brand ID.' }),
  url_source: z.string().url({ message: 'Invalid URL format.' }),
});

export type CreateProductSchema = z.infer<typeof CreateProductSchema>;
