import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { caloriesCreateSchema } from '@/lib/validations/calories';
import { DateTime } from 'luxon';

const entryCreateSchema = caloriesCreateSchema;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const { user } = session;
    const calories = await db.calories.findMany({
      where: {
        userId: user.id
      }
    });

    let previousWeight: number | null = null;

    const res = calories.map((calorie, index) => {
      let weightDifference: number | null = null;

      if (
        previousWeight !== null &&
        calorie.weight !== null &&
        calorie.weight > 0
      ) {
        weightDifference = calorie.weight - previousWeight;
      }

      previousWeight = calorie.weight;
      return {
        ...calorie,
        totalCalories:
          (calorie.breakfast ?? 0) +
          (calorie.lunch ?? 0) +
          (calorie.dinner ?? 0) +
          (calorie.snacks ?? 0),
        weightDayDiff: weightDifference
      };
    });

    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const json = await req.json();
    const body = entryCreateSchema.parse(json);
    const entry = await db.calories.create({
      data: {
        breakfast: body.breakfast,
        lunch: body.lunch,
        dinner: body.dinner,
        snacks: body.snacks,
        weight: body.weight,
        userId: session.user.id,
        logDate: DateTime.fromFormat(body.logDate, 'yyyy-MM-dd').toJSDate()
      },
      select: {
        entryId: true
      }
    });

    return new Response(JSON.stringify(entry));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
