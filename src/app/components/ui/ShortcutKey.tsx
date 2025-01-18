interface ShortcutKeyProps {
  keyShortcuts: string | string[];
}

export default function ShortcutKey({ keyShortcuts }: ShortcutKeyProps) {
  const keys = Array.isArray(keyShortcuts) ? keyShortcuts : keyShortcuts.split('+');

  return (
    <div className="flex items-center gap-1 text-secondary-dark" aria-keyshortcuts={keys.join('+')}>
      {keys.map((key, index) => (
        <kbd
          key={index}
          className="rounded-sm bg-neutral-100 px-1 text-xs text-secondary dark:bg-neutral-800 dark:text-secondary-dark"
        >
          {key}
        </kbd>
      ))}
    </div>
  );
}
