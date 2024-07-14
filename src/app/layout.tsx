import '@/app/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import c from 'clsx';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { inter, newsreader } from './lib/fonts';
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
    shortcut: '/icon.png',
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

export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={c('scroll-smooth', GeistMono.variable, inter.variable, newsreader.variable)}
    >
      <body className="text-sm text-primary antialiased dark:bg-[#161616] dark:text-primary-dark md:text-base lg:text-base">
        <Providers>
          <main className="mx-auto min-h-dvh max-w-2xl pb-page-bottom-mobile pt-page-top-mobile md:pb-page-bottom md:pt-page-top">
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
