'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@/app/components/ui/Icon';
import useShortcut from '@/app/hooks/useShortcut';
import usePointerDevice from '@/app/hooks/usePointerDevice';
import ShortcutKey from '@/app/components/ui/ShortcutKey';
import c from 'clsx';

export default function AdaptiveInterface() {
  const [usageCount, setUsageCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const { isPointerDevice } = usePointerDevice();
  useShortcut('d', handleShortcut, {
    modifierKeys: 'Meta',
    preventDefault: true
  });

  function handleShortcut() {
    setUsageCount((prev) => prev + 1);
    setIsPressed(true);

    const timer = setTimeout(() => {
      setIsPressed(false);
    }, 150);

    return () => clearTimeout(timer);
  }

  function determineSizeCategory(count: number) {
    if (count < 5) return 'large';
    if (count < 10) return 'medium';
    return 'small';
  }

  const sizeCategory = determineSizeCategory(usageCount);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className="mt-12 inline-flex flex-col items-center">
        <motion.div
          key={sizeCategory}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
            bounce: 0.3,
            duration: 0.5
          }}
          className="inline-flex justify-center"
        >
          {renderContent(sizeCategory, isPressed)}
        </motion.div>

        {isPointerDevice ? (
          <motion.div
            key={usageCount === 0 ? 'visible' : 'hidden'}
            initial={{ opacity: 1, filter: 'blur(0px)' }}
            animate={{
              opacity: usageCount === 0 ? 1 : 0,
              filter: usageCount === 0 ? 'blur(0px)' : 'blur(4px)'
            }}
            transition={{ duration: 0.15 }}
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

function renderContent(sizeCategory: string, isPressed: boolean) {
  const baseClasses = c(
    'flex items-center rounded-md outline outline-1 bg-[#fefefe] dark:outline-neutral-800 dark:bg-[#1A1A1A] duration-150 transition-transform outline-neutral-200',
    {
      'scale-[.98]': isPressed
    }
  );

  switch (sizeCategory) {
    case 'large':
      return (
        <div className={c(baseClasses, 'gap-1.5 py-2 pl-2 pr-3')}>
          <Icon
            name="trash"
            width={20}
            height={20}
            className="text-neutral-700 dark:text-neutral-300"
          />
          <div className="flex gap-4 text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">Delete</span>
            <ShortcutKey keyShortcuts="⌘+D" />
          </div>
        </div>
      );
    case 'medium':
      return (
        <div className={c(baseClasses, 'gap-1.5 py-1.5 pl-1.5 pr-3')}>
          <Icon
            name="trash"
            width={20}
            height={20}
            className="text-neutral-700 dark:text-neutral-300"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Delete</span>
        </div>
      );
    case 'small':
      return (
        <div className={c(baseClasses, 'p-1')}>
          <Icon
            name="trash"
            width={20}
            height={20}
            className="text-neutral-700 dark:text-neutral-300"
          />
        </div>
      );
    default:
      return null;
  }
}
