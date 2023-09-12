import c from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section
      className={c(
        'rounded-md border dark:bg-[#1C1C1C] bg-neutral-50 dark:border-neutral-800 p-2 md:p-6 lg:p-6',
        className
      )}
    >
      {children}
    </section>
  );
}
