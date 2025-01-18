'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import type { PropsWithChildren } from 'react';

interface AnimateEnterProps {
  delay?: number;
}

export default function AnimateEnter({
  children,
  delay = 0
}: PropsWithChildren<AnimateEnterProps>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 10, filter: 'blur(0.8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 10, filter: 'blur(0.8px)' }}
        transition={{ ease: 'easeOut', duration: 0.3, delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
