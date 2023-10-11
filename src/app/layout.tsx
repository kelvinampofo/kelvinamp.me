import '@/app/styles/globals.css';
import c from 'clsx';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Providers from './providers';

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const robotoFont = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: {
    default: 'Kelvin Ampofo',
    template: '%s'
  },
  metadataBase: new URL('https://kelvinamp.me'),
  creator: 'Kelvin Ampofo',
  description:
    'Crafting interfaces with a focus on design, human-computer interaction and architecture.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'Kelvin Ampofo',
    description:
      'Crafting interfaces with a focus on design, human-computer interaction and architecture.',
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
      'Crafting interfaces with a focus on design, human-computer interaction and architecture.'
  }
};

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={c('scroll-smooth', interFont.variable, robotoFont.variable)}>
      <body className="text-sm text-primary antialiased dark:bg-primary dark:text-primary-dark md:text-base lg:text-base">
        <Providers>
          <main className="mx-auto min-h-full max-w-3xl pb-page-bottom-mobile pt-page-top-mobile md:pb-page-bottom md:pt-page-top">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
