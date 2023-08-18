import { Calories } from '@prisma/client';

export interface CaloriesFull extends Calories {
  totalCalories: number;
  weightDayDiff?: number;
}
