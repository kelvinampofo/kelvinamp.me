import ThemeProvider from '@/components/ThemeProvider';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Kelvin Ampofo',
    template: '%s'
  },
  description: 'Crafting interfaces.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
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
        height: 1200,
        width: 630
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
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Crafting interfaces.'
  }
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={clsx(
        'selection:bg-[#FFF9A8] selection:text-black',
        interFont.variable
      )}
    >
      <body className="mx-auto flex max-w-3xl flex-auto flex-col text-sm antialiased dark:bg-neutral-900 dark:text-neutral-100 md:text-base lg:text-base">
        <ThemeProvider>
          <main className="min-h-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
