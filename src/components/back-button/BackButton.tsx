import Link from "next/link";

import ArrowTopLeft from "../icons/ArrowTopLeft";

import styles from "./BackButton.module.css";

type BackButtonProps = React.ComponentPropsWithoutRef<typeof Link>;

export default function BackButton({ href, ...props }: BackButtonProps) {
  return (
    <Link href={href} className={styles.backButton} {...props}>
      <ArrowTopLeft size={15} aria-hidden />
      <em>Back</em>
    </Link>
  );
}
