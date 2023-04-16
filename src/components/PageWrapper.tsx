'use client';

import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ ease: 'linear', duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
