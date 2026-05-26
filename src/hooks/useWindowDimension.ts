"use client";

import { useLayoutEffect, useRef, useState } from "react";

const IS_SERVER = typeof window === "undefined";

interface WindowDimension<T extends number | undefined = number | undefined> {
  width: T;
  height: T;
}

interface UseWindowDimensionOptions {
  debounceDelay?: number | false;
  initialWidth?: number;
  initialHeight?: number;
}

export function useWindowDimension(options: UseWindowDimensionOptions = {}) {
  const {
    debounceDelay = false,
    initialWidth = 0,
    initialHeight = 0,
  } = options;
  const [dimensions, setDimensions] = useState<WindowDimension>(() => {
    if (IS_SERVER) {
      return { width: initialWidth, height: initialHeight };
    }
    return { width: window.innerWidth, height: window.innerHeight };
  });

  const timerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (IS_SERVER) return;

    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    function handleResize() {
      if (debounceDelay) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(updateDimensions, debounceDelay);
      } else {
        updateDimensions();
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debounceDelay]);

  return dimensions;
}
