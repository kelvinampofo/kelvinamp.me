'use client';

import { useRef, useState, useEffect } from 'react';
import c from 'clsx';

interface TabProps {
  label: string;
  value: string;
}

interface ScrollingTabBarProps {
  tabs: TabProps[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

interface TabButtonProps {
  value: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ScrollingTabBar({ tabs, defaultValue, onChange }: ScrollingTabBarProps) {
  const [selectedTab, setSelectedTab] = useState(defaultValue || 'all');
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const handleScroll = () => {
      setIsScrolledToStart(element.scrollLeft === 0);
      setIsScrolledToEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth);
    };

    element.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center" role="tablist" aria-label="Navigation tabs">
      <TabButton
        value="all"
        label="All"
        isSelected={selectedTab === 'all'}
        onClick={() => handleTabClick('all')}
      />

      <div
        ref={scrollContainerRef}
        className={c(
          'scroll-container overflow-x-auto overflow-y-visible whitespace-nowrap p-2 transition-all will-change-scroll',
          // apply a full fade effect when not at the edges. fade on the right if starting, and fade on the left if not.
          !isScrolledToStart && !isScrolledToEnd
            ? 'mask-gradient'
            : isScrolledToStart
              ? 'mask-gradient-right'
              : 'mask-gradient-left'
        )}
      >
        <div className="flex gap-1.5">
          {tabs.map(({ value, label }) => (
            <TabButton
              key={value}
              value={value}
              label={label}
              isSelected={selectedTab === value}
              onClick={() => handleTabClick(value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({ label, isSelected, onClick }: TabButtonProps) {
  return (
    <button
      role="tab"
      onClick={onClick}
      className={c(
        'cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors active:scale-[.98] dark:border-neutral-800',
        isSelected
          ? 'border-blue-700 bg-blue-500 text-neutral-50 dark:border-blue-700 dark:bg-blue-600'
          : 'border-neutral-300 bg-neutral-100 text-primary dark:bg-neutral-900 dark:text-primary-dark'
      )}
      aria-selected={isSelected}
      tabIndex={0}
    >
      {label}
    </button>
  );
}
