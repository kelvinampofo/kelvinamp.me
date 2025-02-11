'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { type PropsWithChildren, useEffect, useState } from 'react';

const variants = {
  initial: { opacity: 0, y: 10, filter: 'blur(0.8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { ease: 'easeOut', duration: 0.3 }
};

interface AnimateEnterProps {
  delay?: number;
}

export default function AnimateEnter({
  children,
  delay = 0
}: PropsWithChildren<AnimateEnterProps>) {
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // workaround for hydration errors
  if (!isClient) {
    return null;
  }

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ ...variants.transition, delay }}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
