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
import { Skeleton } from './ui/skeleton';

const formSchema = caloriesCreateSchema;

const InputSkeleton = ({
  loading,
  children
}: {
  loading: boolean;
  children: React.ReactElement;
}) => {
  if (loading) {
    return <Skeleton className="h-10" />;
  } else {
    return children;
  }
};

export function EditEntry({
  entryId,
  onSuccess,
  setEditLoading
}: {
  entryId: number;
  onSuccess?: () => void;
  setEditLoading: (loading: boolean) => void;
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
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
    setEditLoading(true);
    const response = await fetch(`/api/calories/${entryId}`, {
      method: 'PATCH',
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

    if (response.ok) {
      onSuccess?.();
    }

    // This forces a cache invalidation.
    router.refresh();
    setEditLoading(false);
  };

  useEffect(() => {
    fetch(`/api/calories/${entryId}`)
      .then((res) => res.json())
      .then((data) => {
        form.reset({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
          snacks: data.snacks,
          weight: data.weight,
          logDate: DateTime.fromISO(data.logDate).toFormat('yyyy-MM-dd')
        });
        setLoading(false);
      });
  }, [entryId, form]);

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
                <InputSkeleton loading={loading}>
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
                </InputSkeleton>
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
                <InputSkeleton loading={loading}>
                  <Input
                    suffix="kcal"
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </InputSkeleton>
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
                <InputSkeleton loading={loading}>
                  <Input
                    suffix="kcal"
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </InputSkeleton>
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
                <InputSkeleton loading={loading}>
                  <Input
                    suffix="kcal"
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </InputSkeleton>
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
                <InputSkeleton loading={loading}>
                  <Input
                    suffix="kcal"
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </InputSkeleton>
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
                <InputSkeleton loading={loading}>
                  <Input suffix="kg" type="weight" placeholder="0" {...field} />
                </InputSkeleton>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
