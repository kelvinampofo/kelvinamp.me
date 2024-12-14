'use client';

import type { PropsWithChildren } from 'react';

export default function ProgressiveBlur({ children }: PropsWithChildren) {
  return (
    <div
      className="mask-gradient relative w-full overflow-hidden whitespace-nowrap"
      aria-label="scrolling text with a progressive linear blur effect"
      role="marquee"
    >
      <span
        className="marquee inline-flex items-center gap-1 pl-[100%] will-change-transform"
        aria-hidden="true"
      >
        {children}
      </span>
    </div>
  );
}
