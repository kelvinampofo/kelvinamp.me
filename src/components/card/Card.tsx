import clsx from "clsx";

import styles from "./Card.module.css";

interface CardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  description?: string;
}

export default function Card({
  children,
  className,
  description,
  ...props
}: CardProps) {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      <div className={styles.content}>{children}</div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
