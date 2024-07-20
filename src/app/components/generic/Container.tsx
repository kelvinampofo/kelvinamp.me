import c from 'clsx';
import type { PropsWithChildren } from 'react';

export default function Container({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return <div className={c('px-4 md:px-0', className)}>{children}</div>;
}
