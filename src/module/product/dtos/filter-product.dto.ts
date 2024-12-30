import { z } from 'zod';

export const FilterProductSchema = z.object({
  search: z.string().optional(),
  filter: z
    .string()
    .transform((value) => JSON.parse(value))
    .pipe(
      z.array(
        z.object({
          field: z.enum(['category', 'brand']),
          value: z.string(),
        }),
      ),
    )
    .optional(),
  sort: z
    .string()
    .transform((value) => JSON.parse(value))
    .pipe(
      z.array(
        z.object({
          field: z.enum(['title', 'price']),
          value: z.enum(['asc', 'desc']),
        }),
      ),
    )
    .optional(),
});

export type FilterProductDto = z.infer<typeof FilterProductSchema>;
