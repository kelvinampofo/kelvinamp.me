import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  ariaHidden?: boolean;
}

export default function Badge({ children, ariaHidden = false }: BadgeProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="dark:shine-animation bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 bg-clip-text bg-left text-xs text-transparent dark:from-teal-200 dark:via-blue-600 dark:to-teal-200"
    >
      {children}
    </span>
  );
}
