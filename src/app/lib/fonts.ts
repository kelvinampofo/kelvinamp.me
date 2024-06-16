import { Inter, Newsreader } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap'
});
