import { Children, PropsWithChildren } from 'react';

export default function ShortcutKeys({ children }: PropsWithChildren) {
  const keys = Children.toArray(children);

  return (
    <div className="flex gap-1 text-secondary-dark" aria-keyshortcuts={keys.join('+')}>
      {keys.map((keyShortcut, index) => (
        <kbd
          key={index}
          className="rounded-sm bg-neutral-100 px-1 text-xs text-secondary dark:bg-neutral-800 dark:text-secondary-dark"
        >
          {keyShortcut}
        </kbd>
      ))}
    </div>
  );
}
