'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { caloriesCreateSchema } from '@/lib/validations/calories';
import { DateTime } from 'luxon';
import { DatePicker } from './ui/date-picker';
import { useEffect, useState } from 'react';

const formSchema = caloriesCreateSchema;

export function QuickEntryForm() {
  const router = useRouter();
  // @ts-ignore
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snacks: 0,
      weight: 0,
      logDate: DateTime.now().toFormat('yyyy-MM-dd')
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/calories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        breakfast: values.breakfast,
        lunch: values.lunch,
        dinner: values.dinner,
        logDate: values.logDate,
        snacks: values.snacks,
        weight: values.weight
      })
    });

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();
  };

  const [month, setMonth] = useState<Date>();

  useEffect(() => {
    form.watch((data) =>
      setMonth(
        DateTime.fromFormat(data.logDate as string, 'yyyy-MM-dd').toJSDate()
      )
    );
  }, [form, form.watch]);

  return (
    <Form {...form}>
      <form
        id="add-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="logDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker
                  month={month}
                  setMonth={setMonth}
                  date={DateTime.fromFormat(
                    field.value as string,
                    'yyyy-MM-dd'
                  ).toJSDate()}
                  setDate={(date) =>
                    date
                      ? field.onChange(
                          DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
                        )
                      : null
                  }
                  todayFunction={() =>
                    form.setValue(
                      'logDate',
                      DateTime.now().toFormat('yyyy-MM-dd')
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="breakfast"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breakfast</FormLabel>
              <FormControl>
                <Input suffix="kcal" type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lunch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lunch</FormLabel>
              <FormControl>
                <Input suffix="kcal" type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dinner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dinner</FormLabel>
              <FormControl>
                <Input suffix="kcal" type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="snacks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Snacks</FormLabel>
              <FormControl>
                <Input suffix="kcal" type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input suffix="kg" type="weight" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
