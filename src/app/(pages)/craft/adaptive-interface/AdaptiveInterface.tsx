'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@/app/components/ui/Icon';
import useShortcut from '@/app/hooks/useShortcut';
import c from 'clsx';
import usePointerDevice from '@/app/hooks/usePointerDevice';

export default function ProgressivelyHidden() {
  const [usageCount, setUsageCount] = useState(0);

  useShortcut('d', () => setUsageCount((prev) => prev + 1), {
    preventDefault: true,
    modifierKeys: ['Meta']
  });

  const { isPointerDevice } = usePointerDevice();

  const sizeCategory = useMemo(() => {
    if (usageCount < 5) return 'large';
    if (usageCount < 10) return 'medium';
    return 'small';
  }, [usageCount]);

  const renderContent = () => {
    const baseClasses =
      'flex items-center rounded-md border bg-[#fefefe] dark:border-neutral-800 dark:bg-[#1C1C1C]';

    switch (sizeCategory) {
      case 'large':
        return (
          <div className={c(baseClasses, 'space-x-1 py-2 pl-2 pr-2.5')}>
            <Icon name="trash" width={20} height={20} />
            <span className="inline-flex gap-4 text-sm text-primary dark:text-primary-dark">
              Delete{' '}
              <span className="space-x-0.5 text-secondary dark:text-secondary-dark">
                <kbd>⌘</kbd>
                <kbd>D</kbd>
              </span>
            </span>
          </div>
        );
      case 'medium':
        return (
          <div className={c(baseClasses, 'gap-1 px-2 py-1')}>
            <Icon name="trash" width={20} height={20} />
            <span className="text-sm text-primary dark:text-primary-dark">Delete</span>
          </div>
        );
      case 'small':
        return (
          <div className={c(baseClasses, 'justify-center p-1')}>
            <div className="flex size-4 items-center justify-center rounded-sm bg-[#fefefe] text-primary dark:bg-[#1C1C1C] dark:text-primary-dark">
              <Icon name="trash" width={20} height={20} />
            </div>
          </div>
        );
      default:
        sizeCategory satisfies never;
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div className="mt-12 inline-flex flex-col items-center">
        <motion.div
          key={sizeCategory}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="inline-flex justify-center"
        >
          {renderContent()}
        </motion.div>

        {isPointerDevice ? (
          <motion.div
            key={usageCount === 0 ? 'visible' : 'hidden'}
            initial={{ opacity: 1, filter: 'blur(0px)' }}
            animate={{
              opacity: usageCount === 0 ? 1 : 0,
              filter: usageCount === 0 ? 'blur(0px)' : 'blur(4px)'
            }}
            transition={{ duration: 0.1 }}
            className="mt-10 h-4 text-xs text-secondary dark:text-secondary"
          >
            Press keyboard shortcuts a few times
          </motion.div>
        ) : (
          <span className="mt-10 text-xs text-secondary dark:text-secondary">
            This prototype is designed for keyboard users.
          </span>
        )}
      </div>
    </AnimatePresence>
  );
}
