import { buttonVariants } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default async function IndexPage() {
  return (
    <main className="w-full p-4 md:p-10 mx-auto max-w-7xl">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-8 text-center">
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
      <section
        id="features"
        className="container space-y-6  py-8  md:py-10 lg:py-12"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-16 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Why Just Log It?
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-between gap-y-8">
            <div className="flex justify-center items-center">
              <span className="text-4xl mr-3">⚡</span>
              <span className="text-lg font-bold">Easy Data Input</span>
            </div>
            <div>
              <span className="text-4xl mr-3">📊</span>
              <span className="text-lg font-bold">Visual Progress</span>
            </div>
            <div>
              <span className="text-4xl mr-3">🏆</span>
              <span className="text-lg font-bold">Adaptive Goals</span>
            </div>
          </div>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Simplicity is the cornerstone of consistency. When tracking weight,
            an uncomplicated system encourages regular input, ensuring users
            don&apos;t get overwhelmed or distracted. This ease of use paves the
            way to consistently hitting targets, fostering genuine, sustainable
            progress. By focusing on what&apos;s essential, users can maintain
            momentum and stay committed to their health journey.
          </p>
        </div>
      </section>
    </main>
  );
}
