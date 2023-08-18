'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { User } from 'next-auth/core/types';
import { siteConfig } from '@/config/site';

export function MainNav({ user }: { user?: User & { id: string } }) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/playground'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
