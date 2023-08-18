import { PostCreateButton } from '@/components/post-create-button';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function PlaygroundPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/');
  }

  const calories = await db.calories.findMany({
    where: {
      userId: user.id
    }
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <PostCreateButton />
      <p>{JSON.stringify(calories)}</p>
      <p>{JSON.stringify(user)}</p>
    </main>
  );
}
