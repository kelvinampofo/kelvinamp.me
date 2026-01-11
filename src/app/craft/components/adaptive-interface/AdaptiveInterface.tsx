"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import Trash from "../../../../components/icons/Trash";
import ShortcutKey from "../../../../components/shortcut-key/ShortcutKey";
import usePointerDevice from "../../../../hooks/usePointerDevice";
import useShortcuts from "../../../../hooks/useShortcuts";

import styles from "./AdaptiveInterface.module.css";

export default function AdaptiveInterface() {
  const [usageCount, setUsageCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const { isPointerDevice } = usePointerDevice();

  const handleShortcut = () => {
    setUsageCount((prevCount) => prevCount + 1);
    setIsPressed(true);

    setTimeout(() => setIsPressed(false), 150);
  };

  const resetUsage = () => setUsageCount(0);

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
    <Trash
      className={styles.icon}
      size={20}
      aria-label="trash icon"
      aria-hidden="true"
    />
  );
}
