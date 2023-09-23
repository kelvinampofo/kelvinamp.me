import '@/app/styles/globals.css';
import c from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
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
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={c('scroll-smooth selection:bg-[#FFF9A8] selection:text-black', interFont.variable)}
    >
      <body className="mx-auto flex max-w-3xl flex-col text-sm text-[#161616] antialiased dark:bg-[#161616] dark:text-[#EDEDED] md:text-base lg:text-base">
        <Providers>
          <main className="min-h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
