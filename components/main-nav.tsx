'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { ScrollText, X } from 'lucide-react';
import { useState } from 'react';
import { MobileNav } from './mobile-nav';

export function MainNav() {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="mr-4 flex justify-between">
      <Link href="/" className="mr-6 hidden md:flex items-center space-x-2">
        <ScrollText className="mr-1 h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="items-center space-x-6 text-sm font-medium hidden md:flex">
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/about' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          About
        </Link>
      </nav>

      <MobileNav></MobileNav>
    </div>
  );
}
