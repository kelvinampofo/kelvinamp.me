import clsx from "clsx";
import React from "react";

import styles from "./Fade.module.css";

export type FadeProps = React.HTMLAttributes<HTMLDivElement>;

export default function Fade({ className, ...rest }: FadeProps) {
  return (
    <div
      {...rest}
      aria-hidden
      role="presentation"
      className={clsx(styles.fade, className)}
    />
  );
}
