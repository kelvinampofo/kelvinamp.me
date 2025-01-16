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

  const startProgress = () => {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + INCREMENT;
          if (newProgress >= MAX_PROGRESS) {
            clearIntervalId();

            return MAX_PROGRESS;
          }
          return newProgress;
        });
      }, INTERVAL_MS);
    }
  };

  const resetProgress = () => {
    clearIntervalId();
    setProgress(0);
  };

  const handleMouseDown = () => startProgress();
  const handleMouseUp = () => resetProgress();
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      startProgress();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      resetProgress();
    }
  };

  useEffect(() => {
    return () => clearIntervalId();
  }, []);

  return (
    <button
      className="relative flex items-center justify-center overflow-hidden rounded-md bg-[#fefefe] py-2 pl-2 pr-3 outline outline-1 transition-all will-change-transform hover:bg-neutral-100 hover:outline-neutral-200 active:scale-[.98] dark:bg-[#1A1A1A] dark:outline-neutral-800 hover:dark:bg-neutral-800 hover:dark:outline-neutral-700"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      aria-label="hold to delete"
    >
      <div
        aria-hidden="true"
        style={{
          clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
          transition: 'clip-path 0.2s linear'
        }}
        className="absolute inset-0 bg-red-500/75"
      />
      <div className="flex items-center gap-1.5 text-primary dark:text-primary-dark">
        <Icon
          name="trash"
          className="text-secondary dark:text-secondary-dark"
          width={20}
          height={20}
        />
        <span className="text-sm">Hold to delete</span>
      </div>
    </button>
  );
}
