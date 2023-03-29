import '@/styles/globals.css';

import Footer from '@/components/Footer';
import { RootLayoutProps } from '@/types';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const interFont = Inter({
  display: 'swap',
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
        width: 1920,
        height: 1080
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Kelvin Ampofo',
    card: 'summary_large_image',
    description: 'Crafting interfaces.'
  },
  icons: {
    shortcut: '/favicon.ico'
  }
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={clsx(
        'selection:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-200 dark:selection:bg-neutral-700 dark:selection:text-white',
        interFont.variable
      )}
    >
      <body className="mx-auto flex max-w-3xl flex-auto flex-col text-sm antialiased md:text-base lg:text-base">
        <main className="min-h-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
