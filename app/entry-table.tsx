'use client';

import { DataTable } from '@/components/entry-table/data-table';
import { columns } from '@/components/entry-table/columns';
import { CaloriesFull } from '@/types/models';

export default function EntryTable({ entries }: { entries: CaloriesFull[] }) {
  return (
    <DataTable
      columns={columns}
      data={entries}
      initialSort={[{ id: 'logDate', desc: true }]}
    />
  );
}
