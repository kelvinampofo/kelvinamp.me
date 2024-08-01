'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';

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

  /*
   * This is to ensure the component is rendered consistently on both the server and the client, resolving hydration errors.
   */
  if (!isClient) {
    return null;
  }

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 20, filter: 'blur(1px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 20, filter: 'blur(1px)' }}
        transition={{ ease: 'easeOut', duration: 0.3, delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
