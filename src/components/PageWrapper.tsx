'use client';

import { motion } from 'framer-motion';

export default function PageWrapper({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ ease: 'linear', duration: 0.35 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
