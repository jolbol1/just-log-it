import * as z from 'zod';

export const caloriesPatchSchema = z.object({
  breakfast: z
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  lunch: z.number({ invalid_type_error: 'Must be whole number' }).min(0).int(),
  dinner: z.number({ invalid_type_error: 'Must be whole number' }).min(0).int(),
  snacks: z.number({ invalid_type_error: 'Must be whole number' }).min(0).int(),
  weight: z.number().min(0),
  logDate: z.string()
});

export const caloriesCreateSchema = z.object({
  breakfast: z.coerce
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  lunch: z.coerce
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  dinner: z.coerce
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  snacks: z.coerce
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  weight: z.coerce.number().min(0),
  logDate: z.string()
});

export const caloriesImportSchema = z.array(caloriesCreateSchema);
