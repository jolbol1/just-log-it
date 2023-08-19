import { buttonVariants } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default async function IndexPage() {
  return (
    <main className="w-full p-4 md:p-10 mx-auto max-w-7xl">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Effortless Weight and Calorie Tracking
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Track your calories, monitor weight fluctuations, and achieve your
            fitness goals effortlessly. Dive into a seamless experience and
            witness transformation, one entry at a time.
          </p>
          <div className="space-x-4">
            <Link
              href={authOptions.pages?.signIn ?? '/login'}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            >
              Get Started Now <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
