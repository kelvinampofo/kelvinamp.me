import React from 'react';

interface ShortcutKeysProps {
  keyShortcuts: string[];
}

export default function ShortcutKeys({ keyShortcuts }: ShortcutKeysProps) {
  return (
    <div className="flex gap-1 text-secondary-dark" aria-keyshortcuts={keyShortcuts.join('+')}>
      {keyShortcuts.map((keyShortcut, index) => (
        <span
          key={index}
          className="rounded-sm border px-1 shadow-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 dark:shadow-neutral-950"
        >
          {keyShortcut}
        </span>
      ))}
    </div>
  );
}
