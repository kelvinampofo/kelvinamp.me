"use client";

import { type ReactNode, useEffect } from "react";

interface AnimationControllerProps {
  children: ReactNode;
}

let hasAnimated = false;

export default function AnimationController({
  children,
}: AnimationControllerProps) {
  const shouldAnimate = !hasAnimated;

  useEffect(() => {
    document.documentElement.dataset.animationController = shouldAnimate
      ? "true"
      : "false";

    hasAnimated = true;
  }, [shouldAnimate]);

  return children;
}
