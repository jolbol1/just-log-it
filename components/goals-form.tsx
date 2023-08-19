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
import { goalsCreateSchema } from '@/lib/validations/goals';
import { Goals } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = goalsCreateSchema;

export function GoalsForm({ goals }: { goals: Goals | null }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: goals?.weight ?? 0,
      totalCals: goals?.totalCals ?? 0
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        weight: values.weight,
        totalCals: values.totalCals
      })
    });

    // This forces a cache invalidation.
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        id="add-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="totalCals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Calories</FormLabel>
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
        <Button type="submit" className="relative" disabled={isLoading}>
          {isLoading && (
            <span className="absolute inset-0 w-full h-full flex justify-center items-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </span>
          )}
          <span className={cn({ 'opacity-0': isLoading })}>Save Goals</span>
        </Button>
      </form>
    </Form>
  );
}
