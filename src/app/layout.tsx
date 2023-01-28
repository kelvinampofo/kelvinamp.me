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
        'selection:bg-gray-500 dark:bg-neutral-900 dark:text-neutral-200',
        fontSans.variable
      )}
    >
      <head />
      <body className="mx-auto flex max-w-3xl flex-auto flex-col text-sm md:text-base">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
