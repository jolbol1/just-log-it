'use client';

import { DataTable } from '@/components/entry-table/data-table';
import { useRouter } from 'next/navigation';
import { columns } from '@/components/entry-table/columns';
import { CaloriesFull } from '@/types/models';

export default async function EntryTable({
  entries
}: {
  entries: CaloriesFull[];
}) {
  const router = useRouter();

  return (
    <>
      <DataTable
        columns={columns}
        data={entries}
        initialSort={[{ id: 'logDate', desc: true }]}
      />
    </>
  );
}
