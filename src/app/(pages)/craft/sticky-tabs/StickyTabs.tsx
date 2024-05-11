'use client';

import c from 'clsx';
import { MotionConfig, motion } from 'framer-motion';
import { useState } from 'react';

const tabs = ['Software', 'Design', 'HCI', 'Architecture'];

export default function StickyTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative mx-auto flex h-14 w-[600px] items-center">
      <MotionConfig transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}>
        <motion.ul layout className={c('mx-auto flex gap-2')}>
          {tabs.map((tab) => (
            <motion.li
              layout
              className={c(
                'relative cursor-pointer rounded-[4px] px-2 py-1 text-sm outline-none transition-colors',
                activeTab === tab
                  ? 'text-neutral-800 dark:text-primary-dark'
                  : 'text-neutral-700 dark:text-primary-dark'
              )}
              tabIndex={0}
              key={tab}
              onFocus={() => handleTabChange(tab)}
              onMouseOver={() => handleTabChange(tab)}
            >
              {activeTab === tab ? (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-[4px] bg-black/5 dark:bg-neutral-600/40"
                />
              ) : null}
              <span className="relative text-inherit">{tab}</span>
            </motion.li>
          ))}
        </motion.ul>
      </MotionConfig>
    </div>
  );
}
