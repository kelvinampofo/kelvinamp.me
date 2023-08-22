import c from 'clsx';
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section
      className={c(
        'rounded-sm border dark:bg-transparent bg-gray-50 dark:border-neutral-800 p-2 md:p-6 lg:p-6',
        className
      )}
    >
      {children}
    </section>
  );
}
