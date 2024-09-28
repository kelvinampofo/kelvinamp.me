'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

const phrases = [
  'Crafting the solution',
  'Thinking',
  'Analysing',
  'Reflecting',
  'Searching',
  'Assessing'
];

export default function LoadingText() {
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    const duration = 4000;
    const intervalId = setInterval(() => {
      setViewIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full">
      {phrases.map((phrase, index) => (
        <div
          key={phrase}
          className={clsx(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
            {
              'opacity-80': index === viewIndex,
              'opacity-0': index !== viewIndex
            }
          )}
        >
          <span
            className="animate-shine bg-[length:200%] bg-clip-text font-medium text-transparent [background-image:linear-gradient(to_right,_#555555_0%,_#d1d5db_40%,_#d1d5db_50%,_#555555_60%,_#555555_100%)]
            "
          >
            {phrase}
          </span>
        </div>
      ))}
    </div>
  );
}
