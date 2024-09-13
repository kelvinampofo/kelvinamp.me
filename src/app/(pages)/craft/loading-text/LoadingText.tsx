'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const phrases = [
  'Crafting the solution',
  'Thinking',
  'Analysing',
  'Reflecting',
  'Researching',
  'Searching'
];

export default function LoadingText() {
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    const duration = 4000;
    const interval = setInterval(() => {
      setViewIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg font-medium"
      >
        <div
          className="animate-shine bg-[length:200%] bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(to right, #555555 0%, #d1d5db 40%, #9ca3af 50%, #555555 60%, #555555 100%)',
            WebkitBackgroundClip: 'text',
            MozBackgroundClip: 'text'
          }}
        >
          {phrases[viewIndex]}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
