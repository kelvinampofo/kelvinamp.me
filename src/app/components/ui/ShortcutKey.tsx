import React from 'react';

export default function ShortcutKeys({ keyShortcuts }: { keyShortcuts: string[] }) {
  return (
    <div className="flex gap-1 text-secondary-dark" aria-keyshortcuts={keyShortcuts.join('+')}>
      {keyShortcuts.map((keyShortcut, index) => (
        <span
          key={index}
          className="rounded-sm bg-neutral-100 px-1 text-xs text-secondary dark:bg-neutral-800 dark:text-secondary-dark"
        >
          {keyShortcut}
        </span>
      ))}
    </div>
  );
}
