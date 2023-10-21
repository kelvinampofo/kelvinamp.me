import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  ariaHidden?: boolean;
}

export default function Badge({ children, ariaHidden }: BadgeProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="mx-2 animate-shine bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 bg-200 bg-clip-text bg-left text-xs text-transparent dark:from-teal-200 dark:via-blue-600 dark:to-teal-200"
    >
      {children}
    </span>
  );
}
