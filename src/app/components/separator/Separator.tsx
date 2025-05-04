import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Separator.module.css";

interface SeparatorProps extends ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
}

export default function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      className={clsx(
        styles.separator,
        orientation === "vertical" ? styles.vertical : styles.horizontal,
        className
      )}
      {...props}
    />
  );
}
