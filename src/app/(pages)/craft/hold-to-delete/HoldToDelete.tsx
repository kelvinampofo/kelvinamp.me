'use client';

import { domAnimation, LazyMotion, m } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../components/ui/Icon';

const MAX_PROGRESS = 100;
const INTERVAL_MS = 100;
const DURATION = 1800;

export default function HoldToDelete() {
  const [progress, setProgress] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (!intervalIdRef.current!) {
      intervalIdRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + MAX_PROGRESS / (DURATION / INTERVAL_MS);
          if (newProgress >= MAX_PROGRESS) {
            clearInterval(intervalIdRef.current!);
            intervalIdRef.current = null;

            return MAX_PROGRESS;
          }
          return newProgress;
        });
      }, INTERVAL_MS);
    }
  };

  const handleMouseUp = () => {
    clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
    setProgress(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleMouseDown();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleMouseUp();
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalIdRef.current!);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.button
        className="relative flex items-center justify-center overflow-x-hidden rounded-md border bg-neutral-50 px-4 py-2 transition-all hover:border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#1C1C1C] hover:dark:border-neutral-700 hover:dark:bg-neutral-800"
        whileTap={{ scale: 0.96 }}
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
        <m.div
          aria-hidden="true"
          animate={{ width: `${progress}%`, transition: { ease: 'linear', duration: 0.2 } }}
          className="absolute left-0 h-full bg-red-500/75"
        />
        <div className="flex items-center gap-2 text-primary dark:text-primary-dark">
          <Icon
            name="trash"
            className="text-secondary dark:text-secondary-dark"
            width={20}
            height={20}
          />
          <span className="text-xs sm:text-sm">Hold to delete</span>
        </div>
      </m.button>
    </LazyMotion>
  );
}
