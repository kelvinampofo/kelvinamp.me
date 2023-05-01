'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function PageWrapper({
  children,
  className,
  delay = 0
}: PageWrapperProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ ease: 'linear', duration: 0.35, delay }}
        className={className}
      >
        {children}
      </m.section>
    </LazyMotion>
  );
}
