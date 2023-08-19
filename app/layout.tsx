import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/providers';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontHeading.variable,
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1 flex">{children}</div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
