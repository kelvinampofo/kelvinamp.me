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
        'h-52 rounded-md border border-neutral-200 bg-[#F8F8F8] p-2 dark:border-neutral-800 dark:bg-[#171717] dark:shadow-neutral-900 md:p-6 lg:p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
