'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

interface AnimateEnterProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimateEnter({ children, delay = 0 }: AnimateEnterProps) {
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  /*
   * This is to ensure the component is rendered consistently on both the server and the client, resolving hydration errors.
   */
  if (isClient) {
    if (prefersReducedMotion) {
      return children;
    }
  } else {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ ease: 'easeOut', duration: 0.35, delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
