import styles from "./Card.module.css";

interface CardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  description?: string;
}

export default function Card({ children, description, ...props }: CardProps) {
  return (
    <div className={styles.cardContainer} {...props}>
      <div className={styles.cardContent}>{children}</div>
      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>
  );
}
