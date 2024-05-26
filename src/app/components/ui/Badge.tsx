interface BadgeProps {
  children: React.ReactNode;
  ariaHidden?: boolean;
}

export default function Badge({ children, ariaHidden = false }: BadgeProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="dark:shine bg-[length:200%_100%] text-xs text-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-teal-300 dark:to-blue-600 dark:bg-clip-text dark:text-transparent"
    >
      {children}
    </span>
  );
}
