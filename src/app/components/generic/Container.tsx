import c from 'clsx';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={c('flex flex-col justify-center px-8', className)}>{children}</div>;
}
