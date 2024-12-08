'use client';

import { useEffect, useState } from 'react';

const IS_SERVER = typeof window === 'undefined';

interface WindowDimension<T extends number | undefined = number | undefined> {
  width: T;
  height: T;
}

interface UseWindowDimensionOptions {
  debounceDelay?: number | false;
}

const debounce = (callback: () => void, delay: number): (() => void) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
};

export const useWindowDimension = (options: UseWindowDimensionOptions = {}) => {
  const { debounceDelay = false } = options;

  const initializeWithValue = () => {
    if (IS_SERVER) {
      return { width: 0, height: 0 };
    }
    return { width: window.innerWidth, height: window.innerHeight };
  };

  const [dimensions, setDimensions] = useState<WindowDimension>(initializeWithValue);

  useEffect(() => {
    if (IS_SERVER) return;

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleResize = debounceDelay
      ? debounce(updateDimensions, debounceDelay)
      : updateDimensions;

    updateDimensions();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceDelay]);

  return dimensions;
};
