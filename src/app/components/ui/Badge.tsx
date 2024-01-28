interface BadgeProps {
  children: React.ReactNode;
  ariaHidden?: boolean;
}

export default function Badge({ children, ariaHidden = false }: BadgeProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="dark:shine-animation text-xs text-blue-600 dark:bg-gradient-to-r dark:from-teal-200 dark:via-blue-600 dark:to-teal-200 dark:bg-clip-text dark:bg-left dark:text-transparent"
    >
      {children}
    </span>
  );
}
