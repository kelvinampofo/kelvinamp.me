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
        'rounded-md border bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-[#1C1C1C] md:p-6 lg:p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
