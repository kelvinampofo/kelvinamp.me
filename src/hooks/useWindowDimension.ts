"use client";

import { use, useLayoutEffect, useRef, useState } from "react";
import { browser } from "react-dom";

interface WindowDimension<T extends number | undefined = number | undefined> {
  width: T;
  height: T;
}

interface UseWindowDimensionOptions {
  debounceDelay?: number | false;
}

export function useWindowDimension(options: UseWindowDimensionOptions = {}) {
  use(browser("Window dimensions are only available in the browser."));

  const { debounceDelay = false } = options;
  const [dimensions, setDimensions] = useState<WindowDimension>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  const timerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
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
