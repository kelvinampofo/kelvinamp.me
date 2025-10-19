import clsx from "clsx";
import type { HTMLAttributes } from "react";

import styles from "./Fade.module.css";

type FadeAxis = "vertical" | "horizontal";
type FadeEdge = "leading" | "trailing";

interface FadeProps extends HTMLAttributes<HTMLDivElement> {
  /** Axis the scroll container flows on. */
  axis?: FadeAxis;
  /** Edge of the scroll container to anchor the fade against. */
  edge?: FadeEdge;
}

/**
 * Overlay that fades content at a scroll edge, similar to SwiftUI's
 * `ScrollEdgeEffectStyle`. Acts as a purely visual element.
 */
export default function Fade({
  axis = "vertical",
  edge = "leading",
  className,
  ...props
}: FadeProps) {
  return (
    <div
      {...props}
      aria-hidden
      role="presentation"
      data-axis={axis}
      data-edge={edge}
      className={clsx(styles.fade, className)}
    />
  );
}
