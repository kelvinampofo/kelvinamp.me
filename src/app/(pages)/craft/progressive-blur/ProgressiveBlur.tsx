'use client';

import { type CSSProperties, useEffect, useRef } from 'react';

type AnimationPlayState = CSSProperties['animationPlayState'];

export default function ProgressiveBlur() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const playState: AnimationPlayState = document.hidden ? 'paused' : 'running';
      if (ref.current) ref.current.style.animationPlayState = playState;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="mask-gradient relative w-full overflow-hidden whitespace-nowrap"
      role="marquee"
      aria-label="scrolling text with progressive blur effect"
    >
      <div
        ref={ref}
        className="marquee inline-flex items-center gap-4 pl-[100%] will-change-transform"
      >
        <p>The quick brown fox jumps over the lazy dog.</p>
        <p>The five boxing wizards jump quickly.</p>
      </div>
    </div>
  );
}
