import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/providers';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['Tracker', 'Calories', 'Weight', 'Fitness', 'Goals'],
  authors: [
    {
      name: 'James Shopland',
      url: 'https://jamesshopland.com'
    }
  ],
  creator: 'James Shopland',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og.jpg` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@jollyshopland'
  },
  icons: [
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' }
  ],
  manifest: `${siteConfig.url}/site.webmanifest`
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
        id="root"
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
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
