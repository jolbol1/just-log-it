import Link from 'next/link';

import { cn } from '@/lib/utils';
import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { UserAccountNav } from './user-account-nav';
import { getCurrentUser } from '@/lib/session';
import { buttonVariants } from '@/components/ui/button';

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav user={user} />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center gap-4">
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'sm' }),
                  'hidden sm:inline-flex h-8'
                )}
              >
                Dashboard
              </Link>
            )}
            <ModeToggle />
            <UserAccountNav user={user} />
          </nav>
        </div>
      </div>
    </header>
  );
}
