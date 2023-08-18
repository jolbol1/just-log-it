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

const formSchema = caloriesCreateSchema;

export function QuickEntryForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
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
        logDate: values.logDate
      })
    });

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="breakfast"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breakfast</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
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
                <Input type="number" placeholder="0" {...field} />
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
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker
                  date={DateTime.fromFormat(
                    field.value,
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
