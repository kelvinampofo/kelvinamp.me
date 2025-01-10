import c from 'clsx';
import type { HTMLProps, ReactNode } from 'react';

interface CardProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={c(
        'rounded-md border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-[#1C1C1C] dark:shadow-neutral-900 md:p-6 lg:p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
