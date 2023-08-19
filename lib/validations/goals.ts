import * as z from 'zod';

export const goalsPatchSchema = z.object({
  totalCals: z
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  weight: z.number().min(0)
});

export const goalsCreateSchema = z.object({
  totalCals: z.coerce
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  weight: z.coerce.number().min(0)
});
