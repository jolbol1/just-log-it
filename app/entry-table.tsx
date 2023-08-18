'use client';

import { ConfirmDelete } from '@/components/confirm-delete';
import { DataTable } from '@/components/ui/data-table';
import { Calories } from '@prisma/client';
import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

export default async function EntryTable({ entries }: { entries: Calories[] }) {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [entryId, setEntryId] = useState<number>(0);

  const router = useRouter();

  const handleOpen = (enrtyId: number) => {
    setEntryId(enrtyId);
    setDeleteDialog(true);
  };

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
      accessorKey: 'entryId',
      cell: (props) => (
        <TrashIcon
          onClick={() => {
            handleOpen(props.getValue<number>());
          }}
        />
      )
    }
  ];

  return (
    <>
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable columns={columns} data={entries} />
    </>
  );
}
