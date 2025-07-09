"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";

import ShortcutKey from "../../../../components/shortcut-key/ShortcutKey";
import usePointerDevice from "../../../../hooks/usePointerDevice";
import useShortcuts from "../../../../hooks/useShortcuts";

import styles from "./AdaptiveInterface.module.css";

export default function AdaptiveInterface() {
  const [usageCount, setUsageCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const { isPointerDevice } = usePointerDevice();

  const handleShortcut = useCallback(() => {
    setUsageCount((prevCount) => prevCount + 1);
    setIsPressed(true);

    const timer = setTimeout(() => setIsPressed(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const resetUsage = useCallback(() => setUsageCount(0), []);

  useShortcuts("D", handleShortcut, {
    modifiers: "Meta",
    preventDefault: true,
  });

  useShortcuts("R", resetUsage);

  function determineSizeCategory(count: number) {
    if (count < 5) return "large";
    if (count < 10) return "medium";
    return "small";
  }

  const sizeCategory = determineSizeCategory(usageCount);

  const hasUsedShortcut = usageCount > 0;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className={styles.container}>
        <motion.div
          key={sizeCategory}
          className={styles.content}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
            bounce: 0.3,
            duration: 0.5,
          }}
        >
          {renderContent(sizeCategory, isPressed)}
        </motion.div>

        {isPointerDevice ? (
          <motion.div className={styles.pointerWrapper}>
            <AnimatePresence mode="wait" initial={false}>
              {!hasUsedShortcut && (
                <motion.div
                  key="hint"
                  className={styles.pointerMessage}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.15 }}
                >
                  Press keyboard shortcuts a few times
                </motion.div>
              )}
              {usageCount >= 10 && (
                <motion.button
                  key="reset"
                  className={styles.resetButton}
                  initial={{ opacity: 0, filter: "blur(1px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(1px)" }}
                  transition={{ duration: 0.05 }}
                  onClick={() => setUsageCount(0)}
                >
                  Click here or press R to reset
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <span className={styles.nonPointerText}>
            This prototype is designed for keyboard users.
          </span>
        )}
      </div>
    </AnimatePresence>
  );
}

function renderContent(sizeCategory: string, isPressed: boolean) {
  const baseClass = clsx(styles.buttonBase, {
    [styles.pressed]: isPressed,
  });

  switch (sizeCategory) {
    case "large":
      return (
        <div className={clsx(baseClass, styles.sizeLarge)}>
          <TrashIcon />
          <div className={styles.textGroup}>
            <span className={styles.fontMedium}>Delete</span>
            <ShortcutKey keyShortcuts="⌘+D" />
          </div>
        </div>
      );

    case "medium":
      return (
        <div className={clsx(baseClass, styles.sizeMedium)}>
          <TrashIcon />
          <span>Delete</span>
        </div>
      );

    case "small":
      return (
        <div className={clsx(baseClass, styles.sizeSmall)}>
          <TrashIcon />
        </div>
      );

    default:
      return null;
  }
}

function TrashIcon() {
  return (
    <svg
      className={styles.icon}
      width={20}
      height={20}
      aria-label="trash icon"
      aria-hidden="true"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
