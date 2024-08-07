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
      aria-label="scrolling text with progressive blur effect"
    >
      <div
        ref={ref}
        className="inline-flex animate-marquee items-center gap-1 pl-[100%] will-change-transform motion-reduce:animate-marquee-reduced"
      >
        <p>The quick brown fox jumps over the lazy dog.</p>
        <p>The five boxing wizards jump quickly.</p>
      </div>
    </div>
  );
}
