import * as z from 'zod';

const dateRegex =
  /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;

export const caloriesPatchSchema = z.object({
  breakfast: z
    .number({ invalid_type_error: 'Must be whole number' })
    .min(0)
    .int(),
  lunch: z.number({ invalid_type_error: 'Must be whole number' }).min(0).int(),
  dinner: z.number({ invalid_type_error: 'Must be whole number' }).min(0).int(),
  snacks: z.number({ invalid_type_error: 'Must be whole number' }).min(0).int(),
  weight: z.number().min(0),
  logDate: z.string().refine((value) => dateRegex.test(value), {
    message: 'Invalid date format. Expected format is yyyy-MM-dd.'
  })
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
  logDate: z.string().refine((value) => dateRegex.test(value), {
    message: 'Invalid date format. Expected format is yyyy-MM-dd.'
  })
});

export const caloriesImportSchema = z.array(caloriesCreateSchema);
