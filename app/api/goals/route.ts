import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { caloriesCreateSchema } from '@/lib/validations/calories';
import { Prisma } from '@prisma/client';
import { goalsCreateSchema } from '@/lib/validations/goals';

const entryCreateSchema = caloriesCreateSchema;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const { user } = session;
    const goals = await db.goals.findFirstOrThrow({
      where: {
        userId: user.id
      }
    });

    return new Response(JSON.stringify(goals));
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

    const { user } = session;

    const json = await req.json();
    const body = goalsCreateSchema.parse(json);

    const goals = await db.goals.findFirst({
      where: {
        userId: user.id
      },
      select: {
        id: true
      }
    });

    if (goals != null) {
      const entry = await db.goals.update({
        where: {
          id: goals.id
        },
        data: {
          weight: body.weight,
          totalCals: body.totalCals
        }
      });
      return new Response(JSON.stringify(entry));
    }

    const entry = await db.goals.create({
      data: {
        weight: body.weight,
        userId: user.id,
        totalCals: body.totalCals
      },
      select: {
        id: true
      }
    });

    return new Response(JSON.stringify(entry));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response(
          JSON.stringify({ error: 'This email already exists.' }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify({ error: error.message }), {
        status: 422
      });
    }

    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
