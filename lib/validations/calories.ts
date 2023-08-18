import * as z from 'zod';

export const caloriesPatchSchema = z.object({
  breakfast: z.number().min(0),
  lunch: z.number().min(0),
  dinner: z.number().min(0)
});

export const caloriesCreateSchema = z.object({
  breakfast: z.coerce.number().min(0),
  lunch: z.coerce.number().min(0),
  dinner: z.coerce.number().min(0),
  logDate: z.string()
});
