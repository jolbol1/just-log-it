import * as React from 'react';

import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import Link from 'next/link';
import { ScrollText, X } from 'lucide-react';

interface MobileNavProps {
  children?: React.ReactNode;
}

export function MobileNav({ children }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  useLockBody();

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
      <DropdownMenuContent className="w-[100vw] mt-3 rounded-none border-x-0">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="h-12">
            <Link href="/">
              <span className="ml-6 font-medium">Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="h-12">
            <Link href="/about">
              <span className="ml-6 font-medium">About</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
