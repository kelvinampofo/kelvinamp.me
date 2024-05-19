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
          className="rounded-sm bg-neutral-100 px-1 font-medium dark:bg-neutral-800"
        >
          {keyShortcut}
        </Text>
      ))}
    </div>
  );
}
