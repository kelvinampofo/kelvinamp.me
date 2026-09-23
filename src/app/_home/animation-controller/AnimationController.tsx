"use client";

import { type ReactNode, useLayoutEffect } from "react";

interface AnimationControllerProps {
  children: ReactNode;
}

export default function AnimationController({
  children,
}: AnimationControllerProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    function handleVisibilityChange() {
      if (document.hidden) {
        root.toggleAttribute("data-skip-animate", true);
      }
    }

    const shouldAnimate =
      !document.hidden && !navigator.userActivation.hasBeenActive;

    root.toggleAttribute("data-skip-animate", !shouldAnimate);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return children;
}
