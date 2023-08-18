'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/entry-table/data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { EntryAddDialog } from '../entry-add-modal';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium flex reverse">Log Entries</h3>
      <div className="flex gap-2">
        <EntryAddDialog />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
