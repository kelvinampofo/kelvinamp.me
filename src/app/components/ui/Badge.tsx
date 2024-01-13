import Text from '@/app/components/generic/Text';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  ariaHidden?: boolean;
}

export default function Badge({ children, ariaHidden = false }: BadgeProps) {
  return (
    <Text
      aria-hidden={ariaHidden}
      size="xsmall"
      colour="secondary"
      className="rounded-sm border bg-neutral-50 px-1 dark:border-neutral-700 dark:bg-neutral-800"
    >
      {children}
    </Text>
  );
}
