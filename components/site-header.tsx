import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MainNav } from '@/components/main-nav';
// import { MobileNav } from '@/components/mobile-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { UserAccountNav } from './user-account-nav';
import { getCurrentUser } from '@/lib/session';

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            <ModeToggle />
            <UserAccountNav user={user} />
          </nav>
        </div>
      </div>
    </header>
  );
}
