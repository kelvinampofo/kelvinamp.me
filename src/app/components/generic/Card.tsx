import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section
      className={clsx(
        'flex justify-center rounded-md border p-2 dark:border-neutral-800 md:p-20 lg:p-20',
        className
      )}
    >
      {children}
    </section>
  );
}
