"use client";

import type { KeyboardEvent, ReactNode } from "react";

export default function ListNavigation({ children }: { children: ReactNode }) {
  function handleKeyDown(event: KeyboardEvent<HTMLOListElement>) {
    const shouldIgnoreKeyDown =
      event.defaultPrevented ||
      event.key !== "Tab" ||
      !event.repeat ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey;

    if (shouldIgnoreKeyDown) {
      return;
    }

    const boundary = event.currentTarget.querySelector(
      event.shiftKey
        ? ":scope > li:first-child > a"
        : ":scope > li:last-child > a"
    );

    // pause a held Tab at either the first or last item depending on the shift key
    // a fresh press still follows the native tab order
    if (event.target === boundary) {
      event.preventDefault();
    }
  }

  return (
    <ol role="list" data-list="unstyled" onKeyDown={handleKeyDown}>
      {children}
    </ol>
  );
}
