'use client';

import { ConfirmDelete } from '@/components/confirm-delete';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Calories } from '@prisma/client';
import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const RowActions = ({ row }: { row: Row<Calories> }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        aria-label="Delete entry"
        onClick={() => setOpen(true)}
        className="h-6 w-6"
      >
        <TrashIcon className="h-5 w-5" />
      </Button>
      <ConfirmDelete
        entryId={row.getValue('entryId')}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default async function EntryTable({ entries }: { entries: Calories[] }) {
  const router = useRouter();

  const columns: ColumnDef<Calories>[] = [
    {
      accessorKey: 'logDate',
      header: 'Date',
      cell: ({ row }) =>
        DateTime.fromJSDate(row.getValue('logDate')).toLocaleString(
          DateTime.DATE_MED
        )
    },
    {
      accessorKey: 'breakfast',
      header: 'Breakfast'
    },
    {
      accessorKey: 'lunch',
      header: 'Lunch'
    },

    {
      accessorKey: 'dinner',
      header: 'Dinner'
    },
    {
      accessorKey: 'snacks',
      header: 'Snacks'
    },
    {
      accessorKey: 'weight',
      header: 'Weight',
      cell: ({ row }) => row.getValue<number>('weight').toFixed(2) + ' kg'
    },
    {
      accessorKey: 'entryId',
      header: 'Actions',
      cell: (props) => <RowActions row={props.row} />
    }
  ];

  return (
    <>
      <DataTable columns={columns} data={entries} />
    </>
  );
}
