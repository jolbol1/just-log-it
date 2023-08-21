'use client';

import { DataTable } from '@/components/entry-table/data-table';
import { columns } from '@/components/entry-table/columns';
import { CaloriesFull } from '@/types/models';
import { EntryTableContext } from '@/components/entry-table/entry-table-context';
import { useState } from 'react';

export default function EntryTable({ entries }: { entries: CaloriesFull[] }) {
  const [entryId, setEntryId] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <EntryTableContext.Provider
      value={{
        entryId,
        confirmOpen,
        editOpen,
        setEntryId,
        setConfirmOpen,
        setEditOpen
      }}
    >
      <DataTable
        columns={columns}
        data={entries}
        initialSort={[{ id: 'logDate', desc: true }]}
      />
    </EntryTableContext.Provider>
  );
}
