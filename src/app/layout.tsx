import '@/styles/globals.css';

import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Inter } from '@next/font/google';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white dark:bg-[#161616] dark:text-[#E5E5E5]',
        fontSans.variable
      )}
    >
      <head />
      <body
        className={cn(
          'mx-auto flex min-h-screen max-w-3xl flex-auto flex-col text-sm md:text-base'
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
