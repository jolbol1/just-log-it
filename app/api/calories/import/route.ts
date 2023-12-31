import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  caloriesCreateSchema,
  caloriesImportSchema
} from '@/lib/validations/calories';
import { DateTime } from 'luxon';

const entryCreateSchema = caloriesImportSchema;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const json = await req.json();
    const body = entryCreateSchema.parse(json);

    const promises = body.map(async (entry) => {
      const entryDate = DateTime.fromFormat(
        entry.logDate,
        'yyyy-MM-dd'
      ).toJSDate();

      return db.calories.upsert({
        where: {
          userId_logDate: {
            userId: session.user.id,
            logDate: entryDate
          }
        },
        create: {
          breakfast: entry.breakfast,
          lunch: entry.lunch,
          dinner: entry.dinner,
          snacks: entry.snacks,
          weight: entry.weight,
          userId: session.user.id,
          logDate: entryDate
        },
        update: {
          breakfast: entry.breakfast,
          lunch: entry.lunch,
          dinner: entry.dinner,
          snacks: entry.snacks,
          weight: entry.weight
        },
        select: {
          entryId: true
        }
      });
    });

    const results = await Promise.all(promises);

    return new Response(JSON.stringify(results));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
