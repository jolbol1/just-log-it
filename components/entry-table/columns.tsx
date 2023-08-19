'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Calories } from '@prisma/client';
import { DateTime } from 'luxon';
import { CaloriesFull } from '@/types/models';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<CaloriesFull>[] = [
  {
    accessorKey: 'logDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>
        {DateTime.fromJSDate(row.getValue('logDate')).toLocaleString(
          DateTime.DATE_MED
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'breakfast',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Breakfast" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue('breakfast')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'lunch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lunch" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue('lunch')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'dinner',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dinner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue('dinner')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'snacks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Snacks" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue('snacks')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'totalCalories',
    meta: {
      friendlyName: 'Total Calories'
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('totalCalories')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'calorieGoalDiff',
    meta: {
      friendlyName: 'Calorie Goal Diff'
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="w-[100px]"
        title="Goal Diff"
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('calorieGoalDiff');
      return (
        <div
          className={cn(
            'flex space-x-2',
            {
              'after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:z-[-1]':
                Number(value) != 0
            },
            {
              'after:bg-primary/20': Number(value) < 0
            },
            {
              'after:bg-destructive/20': Number(value) > 0
            }
          )}
        >
          <span className="max-w-[500px] truncate font-medium">{value}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const goalDiff = row.getValue<number>('weightGoalDiff');
      return (
        <div
          className={cn(
            'flex space-x-2',
            {
              'after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:z-[-1]':
                Number(goalDiff) != 0
            },
            {
              'after:bg-primary/20': Number(goalDiff) < 0
            },
            {
              'after:bg-destructive/20': Number(goalDiff) > 0
            }
          )}
        >
          <span className="max-w-[500px] truncate ">
            {row.getValue<number>('weight').toFixed(2) + ' kg'}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'weightDayDiff',
    meta: {
      friendlyName: 'Daily Weight Diff'
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difference" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('weightDayDiff')?.toFixed(2) ?? 0;
      return (
        <div
          className={cn(
            'flex space-x-2',
            {
              'after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:z-[-1]':
                Number(value) != 0
            },
            {
              'after:bg-primary/20': Number(value) < 0
            },
            {
              'after:bg-destructive/20': Number(value) > 0
            }
          )}
        >
          <span className="max-w-[500px] truncate font-medium">
            {value + ' kg'}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'weightGoalDiff',
    meta: {
      friendlyName: 'Goal Weight Diff'
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="w-[100px]"
        title="Goal Diff"
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue<number>('weightGoalDiff')?.toFixed(2) ?? 0;
      return (
        <div
          className={cn(
            'flex space-x-2',
            {
              'after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:z-[-1]':
                Number(value) != 0
            },
            {
              'after:bg-primary/20': Number(value) < 0
            },
            {
              'after:bg-destructive/20': Number(value) > 0
            }
          )}
        >
          <span className="max-w-[500px] truncate font-medium">
            {value + ' kg'}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'entryId',
    header: '',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false
  }
];
