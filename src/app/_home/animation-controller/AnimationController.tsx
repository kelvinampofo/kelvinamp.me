"use client";

import { type ReactNode, useLayoutEffect } from "react";

interface AnimationControllerProps {
  children: ReactNode;
}

export default function AnimationController({
  children,
}: AnimationControllerProps) {
  useLayoutEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        document.documentElement.dataset.animationController = "false";
      }
    }

    const shouldAnimate =
      !document.hidden && !navigator.userActivation.hasBeenActive;

    document.documentElement.dataset.animationController = shouldAnimate
      ? "true"
      : "false";

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return children;
}
