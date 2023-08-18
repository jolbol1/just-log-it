'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

interface PostCreateButtonProps {}

export function PostCreateButton({ ...props }: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch('/api/calories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        breakfast: 0,
        lunch: 534,
        dinner: 836
      })
    });

    setIsLoading(false);

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
        {
          'cursor-not-allowed opacity-60': isLoading
        }
      )}
      disabled={isLoading}
      {...props}
    >
      New post
    </button>
  );
}
