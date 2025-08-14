import clsx from "clsx";
import React from "react";

import styles from "./fade.module.css";

type Edge = "top" | "bottom" | "left" | "right";

const DIRECTION_MAP: Record<Edge, string> = {
  top: "to bottom",
  bottom: "to top",
  left: "to right",
  right: "to left",
};

export interface FadeProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "style" | "className" | "aria-hidden" | "role"
  > {
  /** which edge to stick to (default: 'top') */
  edge?: Edge;
  /** where the fade finishes, e.g. '50%', '60px' (default: '25%') */
  stop?: string;
  /** blur radius, e.g. '4px' (default: '4px') */
  blur?: string;
  /** height (top/bottom) or width (left/right) (default: '92px') */
  size?: string;
  /** overall opacity 0 – 1 (default: 0.92) */
  opacity?: number;
}

export default function Fade({
  edge = "top",
  stop = "25%",
  blur = "4px",
  size = "82px",
  opacity = 0.92,
  style,
  className,
  role,
  ...rest
}: FadeProps) {
  const cssVariables = {
    "--direction": DIRECTION_MAP[edge],
    "--mask-stop": stop,
    "--blur-radius": blur,
    "--h": size,
    "--blur-opacity": opacity,
  };

  return (
    <div
      {...rest}
      aria-hidden={rest["aria-hidden"] ?? true}
      role={role ?? "presentation"}
      className={clsx(
        styles.fadeOverlay,
        styles[`fadeOverlay--${edge}`],
        className
      )}
      style={{ ...cssVariables, ...style }}
    />
  );
}
