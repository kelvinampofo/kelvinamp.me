import styles from "./Loading.module.css";

type LoadingVariant =
  | "loading-text"
  | "loading-dots"
  | "primary-spinner"
  | "secondary-spinner"
  | "ios-spinner";

interface LoadingProps {
  variant: LoadingVariant;
}

export default function Loading({ variant }: LoadingProps) {
  switch (variant) {
    case "loading-text":
      return (
        <p className={styles.loadingText}>
          Loading
          <span className={styles.loadingDots} />
        </p>
      );
    case "loading-dots":
      return (
        <div
          className={styles.loadingDots}
          aria-label="Loading..."
          role="progressbar"
        >
          {[...Array(3)].map((_, index) => (
            <span key={index} className={styles.dot} />
          ))}
        </div>
      );
    case "primary-spinner":
      return (
        <div
          className={styles.primarySpinner}
          aria-label="Loading..."
          role="progressbar"
        />
      );
    case "secondary-spinner":
      return (
        <div
          className={styles.secondarySpinner}
          aria-label="Secondary spinner"
          role="progressbar"
        />
      );
    case "ios-spinner":
      return (
        <div
          className={styles.iosSpinner}
          aria-label="Loading..."
          role="progressbar"
        >
          {[...Array(12)].map((_, index) => (
            <div key={index} />
          ))}
        </div>
      );
    default:
      variant satisfies never;
      break;
  }
}
