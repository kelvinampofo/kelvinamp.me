import styles from "./ShortcutKey.module.css";

interface ShortcutKeyProps {
  keys: readonly string[];
}

export default function ShortcutKey({ keys }: ShortcutKeyProps) {
  return (
    <div className={styles.keys} aria-keyshortcuts={keys.join("+")}>
      {keys.map((key) => (
        <kbd key={key} className={styles.key}>
          {key}
        </kbd>
      ))}
    </div>
  );
}
