"use client";

import clsx from "clsx";
import { useRef, useState, useEffect } from "react";

import styles from "./ScrollFadeTabs.module.css";

interface TabProps {
  label: string;
  value: string;
}

interface ScrollFadeTabsProps {
  selected?: string;
  onChange?: (selectedValue: string) => void;
}

interface TabButtonProps extends TabProps {
  isSelected: boolean;
  onClick: () => void;
}

const tabs: TabProps[] = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Art", value: "art" },
  { label: "Science", value: "science" },
  { label: "Technology", value: "technology" },
];

export default function ScrollFadeTabs({
  selected,
  onChange,
}: ScrollFadeTabsProps) {
  const [selectedTab, setSelectedTab] = useState(selected ?? "all");
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
      setIsScrolledToEnd(
        element.scrollLeft + element.clientWidth >= element.scrollWidth
      );
    };

    element.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick(value: string) {
    setSelectedTab((prevSelectedTab) => {
      const newValue = prevSelectedTab === value ? "" : value;
      onChange?.(newValue);
      return newValue;
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabList} role="tablist">
        <TabButton
          value="all"
          label="All"
          isSelected={selectedTab === "all"}
          onClick={() => handleClick("all")}
        />
        <div
          ref={scrollContainerRef}
          className={clsx(
            styles.scrollContainer,
            !isScrolledToStart && !isScrolledToEnd
              ? styles.maskGradient
              : isScrolledToStart
                ? styles.maskGradientRight
                : styles.maskGradientLeft
          )}
        >
          <div className={styles.tabContainer}>
            {tabs.map(({ value, label }) => (
              <TabButton
                key={value}
                value={value}
                label={label}
                isSelected={selectedTab === value}
                onClick={() => handleClick(value)}
              />
            ))}
          </div>
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
      className={clsx(
        styles.tabButtonBase,
        isSelected ? styles.tabButtonSelected : styles.tabButtonDefault
      )}
      aria-selected={isSelected}
      tabIndex={0}
    >
      {label}
    </button>
  );
}
