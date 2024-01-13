import Text from '@/app/components/generic/Text';
import React from 'react';

interface ShortcutKeysProps {
  keyShortcuts: string[];
}

export default function ShortcutKeys({ keyShortcuts }: ShortcutKeysProps) {
  return (
    <div className="flex gap-1 text-secondary-dark" aria-keyshortcuts={keyShortcuts.join('+')}>
      {keyShortcuts.map((keyShortcut, index) => (
        <Text
          key={index}
          size="xsmall"
          colour="secondary"
          className="rounded-sm border px-1 dark:border-neutral-800 dark:bg-neutral-800"
        >
          {keyShortcut}
        </Text>
      ))}
    </div>
  );
}
