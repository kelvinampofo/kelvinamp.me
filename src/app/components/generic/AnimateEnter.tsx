import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimateEnter({ children, delay = 0 }: PageWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    if (prefersReducedMotion) {
      return <>{children}</>;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: 'linear', duration: 0.35, delay }}
        >
          {children}
        </m.div>
      </LazyMotion>
    );
  }
}
