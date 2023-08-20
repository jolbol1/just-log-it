import * as React from 'react';

import { cn } from '@/lib/utils';
import { useLockedBody } from '@/hooks/use-lock-body';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import Link from 'next/link';
import { ScrollText, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { User } from 'next-auth';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect, useState } from 'react';

interface MobileNavProps {
  children?: React.ReactNode;
  user?:
    | (User & {
        id: string;
      })
    | undefined;
}

export function MobileNav({ children, user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useLockedBody(open, 'root');
  const matches = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setOpen(false);
  }, [matches]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 md:hidden">
          {open ? (
            <X className="h-6 w-6 mr-1 text-primary cursor-pointer" />
          ) : (
            <ScrollText className="mr-1 h-6 w-6 text-primary" />
          )}
          <span className="font-bold">Menu</span>
        </button>
      </DropdownMenuTrigger>
      <div
        className={cn({
          'after:top-14 after:bg-background/95 after:absolute  after:right-0 after:left-0 after:bottom-0 after:z-[-1] after:h-[calc(100vh-3.5rem)] after:w-screen':
            open
        })}
      >
        <DropdownMenuContent className="w-[100vw] mt-3 rounded-none border-x-0 ">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="h-12">
              <Link href="/">
                <span
                  className={cn(
                    'ml-6 font-medium text-foreground/80',
                    pathname === '/' ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  Home
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="h-12">
              <Link href="/about">
                <span
                  className={cn(
                    'ml-6 font-medium text-foreground/80',
                    pathname === '/about'
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  About
                </span>
              </Link>
            </DropdownMenuItem>
            {user && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="h-12">
                  <Link href="/dashboard">
                    <span
                      className={cn(
                        'ml-6 font-medium text-foreground/80',
                        pathname === '/dashboard'
                          ? 'text-foreground'
                          : 'text-foreground/60'
                      )}
                    >
                      Dashboard
                    </span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
