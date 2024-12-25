import { z } from 'zod';

export const CreateProductSchema = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
  description: z.string().min(3, { message: 'Description is required' }),
  price: z.number().min(3, { message: 'Price is required' }),
  sku: z.string().min(3, { message: 'Sku is required' }),
  features: z.string().min(3, { message: 'Features is required' }),
  specifications: z.string().min(3, { message: 'Specifications is required' }),
  images: z.string().min(3, { message: 'Images is required' }),
  warranty: z.string().min(3, { message: 'Warranty is required' }),
  deliveryInfo: z.string().min(3, { message: ' DeliveryInfo is required' }),
  categoryId: z.string().min(3, { message: 'CategoryId is required' }),
  brandId: z.string().min(3, { message: 'BrandId is required' }),
  url_source: z.string().min(3, { message: 'URL is required' }),
  discription: z.string().min(3, { message: 'Discription is required!' }),
});
