'use client';

import clsx from 'clsx';
import { useEffect, useState, type PropsWithChildren, type ElementType } from 'react';

const DURATION = 4000;

interface ShimmerTextProps extends PropsWithChildren {
  as?: ElementType;
  ariaLabel?: string;
}

export default function ShimmerText({
  children,
  as: Component = 'div',
  ariaLabel = 'Shimmer text loop'
}: ShimmerTextProps) {
  const [viewIndex, setViewIndex] = useState(0);

  const phrases = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setViewIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, DURATION);

    return () => clearInterval(intervalId);
  }, [phrases.length]);

  return (
    <Component className="relative w-full" aria-label={ariaLabel}>
      {phrases.map((phrase, index) => (
        <div
          key={phrase}
          aria-hidden={index !== viewIndex}
          className={clsx(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
            {
              'opacity-80': index === viewIndex,
              'opacity-0': index !== viewIndex
            }
          )}
        >
          <span className="shimmer bg-[length:200%] bg-clip-text font-medium text-transparent [background-image:linear-gradient(to_right,_#0F0F11_0%,_#e5e7eb_40%,_#e5e7eb_50%,_#0F0F11_60%,_#0F0F11_100%)] dark:[background-image:linear-gradient(to_right,_#555555_0%,_#e5e7eb_40%,_#e5e7eb_50%,_#555555_60%,_#555555_100%)]">
            {phrase}
          </span>
        </div>
      ))}
    </Component>
  );
}
