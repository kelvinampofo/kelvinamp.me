'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../components/ui/Icon';

const MAX_PROGRESS = 100;
const INTERVAL_MS = 100;
const DURATION = 1600; // ms

const INCREMENT = MAX_PROGRESS / (DURATION / INTERVAL_MS);

export default function HoldToDelete() {
  const [progress, setProgress] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const clearIntervalId = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  // increment the progress state over time until the maximum progress is reached.
  const handleMouseDown = () => {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + INCREMENT;
          if (newProgress >= MAX_PROGRESS) {
            clearIntervalId();

            return MAX_PROGRESS;
          }

          return newProgress;
        });
      }, INTERVAL_MS);
    }
  };

  const handleMouseUp = () => {
    clearIntervalId();
    setProgress(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleMouseDown();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleMouseUp();
    }
  };

  useEffect(() => {
    if (intervalIdRef.current) {
      return clearInterval(intervalIdRef.current);
    }
  }, []);

  return (
    <button
      className="relative flex items-center justify-center overflow-x-hidden rounded-md border bg-neutral-50 px-4 py-2 transition-all hover:border-neutral-200 hover:bg-neutral-100 active:scale-[.98] dark:border-neutral-800 dark:bg-[#1C1C1C] hover:dark:border-neutral-700 hover:dark:bg-neutral-800"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
      aria-label="hold to delete"
    >
      <div
        aria-hidden="true"
        style={{ width: `${progress}%`, transition: 'width 0.2s linear' }}
        className="absolute left-0 h-full bg-red-500/80"
      />
      <div className="flex items-center gap-2 text-primary dark:text-primary-dark">
        <Icon
          name="trash"
          className="text-secondary dark:text-secondary-dark"
          width={18}
          height={18}
        />
        <span className="tracking-wide sm:text-sm sm:leading-4">Hold to delete</span>
      </div>
    </button>
  );
}
