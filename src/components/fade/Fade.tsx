import clsx from "clsx";
import type { CSSProperties, HTMLAttributes, Ref } from "react";

import styles from "./Fade.module.css";

type Side = "top" | "bottom" | "left" | "right";

interface FadeProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  stop?: string;
  blur?: string;
  side?: Side;
  className?: string;
  background?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}

export default function Fade({
  stop,
  blur,
  side = "top",
  className,
  background = "var(--color-background)",
  style,
  ref,
  ...props
}: FadeProps) {
  return (
    <div
      {...props}
      ref={ref}
      aria-hidden
      data-side={side}
      className={clsx(styles.fade, className)}
      style={{
        ...(stop ? { "--stop": stop } : {}),
        ...(blur ? { "--blur": blur } : {}),
        "--background": background,
        ...style,
      }}
    />
  );
}
