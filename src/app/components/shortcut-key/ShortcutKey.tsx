import styles from "./ShortcutKey.module.css";

interface ShortcutKeyProps {
  keyShortcuts: string | string[];
}

export default function ShortcutKey({ keyShortcuts }: ShortcutKeyProps) {
  const keys = Array.isArray(keyShortcuts)
    ? keyShortcuts
    : keyShortcuts.split("+");

  return (
    <div className={styles.container} aria-keyshortcuts={keys.join("+")}>
      {keys.map((key) => (
        <kbd key={key} className={styles.key}>
          {key}
        </kbd>
      ))}
    </div>
  );
}
