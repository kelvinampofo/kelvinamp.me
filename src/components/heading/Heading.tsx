import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Heading.module.css";

interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export default function Heading({
  children,
  className,
  as: HeadingTag = "h1",
  ...props
}: HeadingProps) {
  return (
    <HeadingTag className={clsx(styles.heading, className)} {...props}>
      {children}
    </HeadingTag>
  );
}
