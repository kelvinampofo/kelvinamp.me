import clsx from 'clsx';
import React from 'react';
import { Icon } from '../ui/Icon';

type ColorType = 'red' | 'amber' | 'green' | 'blue';

interface CalloutProps {
  color: ColorType;
  children: React.ReactNode;
  className?: string;
  isAlert?: boolean;
  ariaLabel?: string;
}

export default function Callout({ color, children, className, isAlert, ariaLabel }: CalloutProps) {
  const classes = clsx({
    'bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-500 dark:border-red-900':
      color === 'red',
    'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800':
      color === 'amber',
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-500 dark:border-green-900':
      color === 'green',
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-500 dark:border-blue-900':
      color === 'blue'
  });

  return (
    <div
      className={clsx('flex items-center gap-2 rounded-md border p-2', classes, className)}
      role={isAlert ? 'alert' : 'status'}
      aria-label={isAlert ? 'Alert callout' : `${ariaLabel}`}
    >
      {!isAlert ? <Icon name="info-circled" /> : <Icon name="exclamation-triangle" />}
      <span className="break-words">{children}</span>
    </div>
  );
}
