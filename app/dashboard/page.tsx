import { PostCreateButton } from '@/components/post-create-button';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import EntryTable from '../entry-table';
import { Input } from '@/components/ui/input';
import { QuickEntryForm } from '@/components/quick-entry';
import { EntryAddDialog } from '@/components/entry-add-modal';
import { EditEntryDialog } from '@/components/edit-entry-dialog';

export default async function PlaygroundPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const calories = await db.calories.findMany({
    where: {
      userId: user.id
    }
  });

  return (
    <main className="w-full p-4 md:p-10 mx-auto max-w-7xl">
      <EntryAddDialog />
      <EntryTable entries={calories}></EntryTable>
    </main>
  );
}
