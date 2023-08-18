import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { DateTime } from 'luxon';
import {
  MonthChangeEventHandler,
  SelectSingleEventHandler
} from 'react-day-picker';
import { useEffect, useState } from 'react';

interface DatePickerProps {
  date?: Date;
  setDate?: SelectSingleEventHandler;
  month?: Date;
  setMonth?: MonthChangeEventHandler;
  todayFunction: () => void;
}
export function DatePicker({
  date,
  setDate,
  month,
  setMonth,
  todayFunction
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
          initialFocus
        />
        <div className="p-2 w-full">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => todayFunction()}
          >
            Today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
