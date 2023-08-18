import * as z from 'zod';

export const caloriesPatchSchema = z.object({
  breakfast: z.number().min(0),
  lunch: z.number().min(0),
  dinner: z.number().min(0)
});
