'use client';

import { useRef, useState, useEffect } from 'react';
import c from 'clsx';

interface TabProps {
  label: string;
  value: string;
}

interface ScrollFadeTabsProps {
  tabs: TabProps[];
  selected?: string;
  onChange?: (selectedValue: string) => void;
}

interface TabButtonProps extends TabProps {
  isSelected: boolean;
  onClick: () => void;
}

export default function ScrollFadeTabs({ tabs, selected, onChange }: ScrollFadeTabsProps) {
  const [selectedTab, setSelectedTab] = useState(selected ?? 'all');
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected !== undefined) {
      setSelectedTab(selected);
    }
  }, [selected]);

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

  function handleClick(value: string) {
    setSelectedTab((prevSelectedTab) => {
      const newValue = prevSelectedTab === value ? '' : value;
      onChange?.(newValue);
      return newValue;
    });
  }

  return (
    <div className="flex items-center" role="tablist">
      <TabButton
        value="all"
        label="All"
        isSelected={selectedTab === 'all'}
        onClick={() => handleClick('all')}
      />
      <div
        ref={scrollContainerRef}
        className={c(
          'scroll-container overflow-x-auto overflow-y-visible whitespace-nowrap p-2 transition-all will-change-scroll',
          // apply a full fade effect when not at the edges. fade on the right if starting, and fade on the left if not
          !isScrolledToStart && !isScrolledToEnd
            ? 'mask-gradient'
            : isScrolledToStart
              ? 'mask-gradient-right'
              : 'mask-gradient-left'
        )}
      >
        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              {...tab}
              isSelected={selectedTab === tab.value}
              onClick={() => handleClick(tab.value)}
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
        'cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors active:scale-[.98]',
        isSelected
          ? 'border-blue-600 bg-blue-500 text-neutral-50 transition-colors hover:bg-blue-600 dark:border-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
          : 'border-neutral-300 bg-neutral-100 text-primary hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-primary-dark dark:hover:border-neutral-700 dark:hover:bg-neutral-800'
      )}
      aria-selected={isSelected}
      tabIndex={0}
    >
      {label}
    </button>
  );
}
