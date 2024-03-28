import '@/app/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import c from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Kelvin Ampofo',
    template: '%s'
  },
  metadataBase: new URL('https://kelvinamp.me'),
  creator: 'Kelvin Ampofo',
  description:
    'Crafting software with strong focus on design, human-computer interaction and architecture.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'Kelvin Ampofo',
    description:
      'Crafting software with strong focus on design, human-computer interaction and architecture.',
    url: 'https://kelvinamp.me',
    siteName: 'Kelvin Ampofo',
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        height: 1200,
        width: 1200,
        alt: 'Black background image'
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
    creator: '@kelvinamp',
    card: 'summary_large_image',
    description:
      'Crafting software with strong focus on design, human-computer interaction and architecture.'
  }
};

const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={c('scroll-smooth', GeistMono.variable, GeistSans.variable, newsreader.variable)}
    >
      <body className="text-sm text-primary antialiased dark:bg-primary dark:text-primary-dark md:text-base lg:text-base">
        <Providers>
          <main className="container mx-auto min-h-full max-w-3xl pb-page-bottom-mobile pt-page-top-mobile md:pb-page-bottom md:pt-page-top">
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
