"use client";

import { useLayoutEffect, useState, useRef, useCallback } from "react";

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

export const useWindowDimension = (options: UseWindowDimensionOptions = {}) => {
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
  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useLayoutEffect(() => {
    if (IS_SERVER) return;

    // initial measurement
    updateDimensions();

    const handleResize = () => {
      if (debounceDelay) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(updateDimensions, debounceDelay);
      } else {
        updateDimensions();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debounceDelay, updateDimensions]);

  return dimensions;
};
