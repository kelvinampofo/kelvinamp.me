import '@/styles/globals.css';

import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { RootLayoutProps } from '@/types';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Kelvin Ampofo',
    template: '%s | Kelvin Ampofo'
  },
  description: 'Crafting interfaces.',
  openGraph: {
    title: 'Kelvin Ampofo',
    description: 'Crafting interfaces.',
    url: 'https://kelvinamp.me',
    siteName: 'Kelvin Ampofo',
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        width: 1500,
        height: 1500
      }
    ]
  },
  twitter: {
    title: 'Kelvin Ampofo',
    card: 'summary_large_image',
    description: 'Crafting interfaces.'
  },
  icons: {
    shortcut: '/'
  }
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        'selection:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-200 dark:selection:bg-neutral-700',
        fontSans.variable
      )}
    >
      <head />
      <body className="mx-auto flex max-w-3xl flex-auto flex-col text-sm antialiased md:text-base lg:text-base">
        <main className="min-h-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
