import clsx from "clsx";

import styles from "./Badge.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function Badge({ children, className, ...rest }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, className)} {...rest}>
      {children}
    </span>
  );
}
