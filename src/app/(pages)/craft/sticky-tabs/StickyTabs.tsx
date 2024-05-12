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
    <div className="relative mx-auto">
      <MotionConfig transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}>
        <motion.ul layout className="flex gap-2">
          {tabs.map((tab) => (
            <motion.li
              key={tab}
              tabIndex={0}
              layout
              className={c(
                'relative mx-auto cursor-pointer rounded-[4px] px-2 py-1 text-sm',
                activeTab === tab
                  ? 'text-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-700 dark:text-neutral-200'
              )}
              onFocus={() => handleTabChange(tab)}
              onMouseOver={() => handleTabChange(tab)}
            >
              {activeTab === tab ? (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-[4px] bg-black/5 dark:bg-neutral-600/30"
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
