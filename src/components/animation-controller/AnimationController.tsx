"use client";

import { type ReactNode, useLayoutEffect } from "react";

interface AnimationControllerProps {
  children: ReactNode;
}

let hasAnimated = false;

export default function AnimationController({
  children,
}: AnimationControllerProps) {
  const shouldAnimate = !hasAnimated;

  useLayoutEffect(() => {
    document.documentElement.dataset.animationController = shouldAnimate
      ? "true"
      : "false";

    hasAnimated = true;
  }, [shouldAnimate]);

  return children;
}
