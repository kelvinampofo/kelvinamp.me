"use client";

import { type ReactNode, useLayoutEffect } from "react";

interface AnimationControllerProps {
  children: ReactNode;
}

export default function AnimationController({
  children,
}: AnimationControllerProps) {
  useLayoutEffect(() => {
    const shouldAnimate = !navigator.userActivation.hasBeenActive;

    document.documentElement.dataset.animationController = shouldAnimate
      ? "true"
      : "false";
  }, []);

  return children;
}
