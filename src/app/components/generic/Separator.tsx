import c from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type SeparatorProps = ComponentPropsWithoutRef<'hr'>;

export default function Separator({ className, ...props }: SeparatorProps) {
  return (
    <hr
      className={c(
        'h-px border-0 bg-neutral-200 contrast-more:contrast-50 dark:bg-neutral-800',
        className
      )}
      {...props}
    />
  );
}
