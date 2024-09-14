'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
    <AnimatePresence mode="wait">
      <motion.div
        key={viewIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span
          aria-label="loading text"
          className="
            animate-shine
            bg-[length:200%]
            bg-clip-text 
            font-medium 
            text-transparent 
            [background-image:linear-gradient(to_right,_#555555_0%,_#d1d5db_40%,_#9ca3af_50%,_#555555_60%,_#555555_100%)] 
          "
        >
          {phrases[viewIndex]}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
