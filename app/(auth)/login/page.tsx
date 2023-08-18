'use client';

import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, CircleEllipsis, GithubIcon, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
};

export default function LoginPage() {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  return (
    <div className="relative grow min-h-full container flex w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
        </div>
        <div className={cn('grid gap-6')}>
          <button
            type="button"
            className={cn(buttonVariants({ variant: 'outline' }))}
            onClick={() => {
              setIsGitHubLoading(true);
              signIn('github');
            }}
            disabled={isGitHubLoading}
          >
            {isGitHubLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GithubIcon className="mr-2 h-4 w-4" />
            )}{' '}
            Github
          </button>
        </div>
      </div>
    </div>
  );
}
