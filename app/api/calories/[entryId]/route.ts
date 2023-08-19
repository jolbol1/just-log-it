import { getServerSession } from 'next-auth';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import { caloriesPatchSchema } from '@/lib/validations/calories';
import { DateTime } from 'luxon';

const routeContextSchema = z.object({
  params: z.object({
    entryId: z.coerce.number()
  })
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const session = await getServerSession(authOptions);

    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 });
    }

    const calories = await db.calories.findFirst({
      where: {
        entryId: params.entryId
      }
    });

    return new Response(JSON.stringify(calories));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 });
    }

    // Delete the post.
    await db.calories.delete({
      where: {
        entryId: params.entryId as number
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();
    const body = caloriesPatchSchema.parse(json);

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.calories.update({
      where: {
        entryId: params.entryId
      },
      data: {
        breakfast: body.breakfast,
        lunch: body.lunch,
        dinner: body.dinner,
        snacks: body.snacks,
        weight: body.weight,
        logDate: DateTime.fromFormat(body.logDate, 'yyyy-MM-dd').toJSDate()
      }
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify(error), { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToEntry(entryId: number) {
  const session = await getServerSession(authOptions);
  const count = await db.calories.count({
    where: {
      entryId: entryId,
      userId: session?.user.id
    }
  });

  return count > 0;
}
