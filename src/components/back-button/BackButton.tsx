import Link, { LinkProps } from "next/link";

import styles from "../../styles/layout.module.css";

export default function BackButton({ href, ...props }: LinkProps) {
  return (
    <Link href={href} className={styles.navBackButton} {...props}>
      <ArrowTopLeft />
      <em>Back</em>
    </Link>
  );
}

function ArrowTopLeft() {
  return (
    <svg height={15} width={15} aria-hidden fill="none" viewBox="0 0 15 15">
      <path
        fill="currentColor"
        d="M11.354 11.354a.5.5 0 0 0 0-.707L4.707 
        4H9a.5.5 0 0 0 0-1H3.5a.5.5 0 0 0-.5.5V9a.5.5 0 0 0 1 
        0V4.707l6.646 6.647a.5.5 0 0 0 .708 0Z"
      />
    </svg>
  );
}
