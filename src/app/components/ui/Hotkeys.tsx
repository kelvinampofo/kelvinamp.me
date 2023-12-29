interface HotkeysProps {
  keys: string[];
}

export default function Hotkeys({ keys }: HotkeysProps) {
  return (
    <div className="flex gap-1 text-secondary-dark">
      {keys.map((key, index) => (
        <span
          key={index}
          className="rounded-sm border px-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-800 dark:shadow-black"
        >
          {key}
        </span>
      ))}
    </div>
  );
}
