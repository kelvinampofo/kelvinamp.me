"use client";

import { useSyncExternalStore } from "react";

const FINE_POINTER_QUERY = "(pointer: fine)";

export default function usePointerDevice() {
  const isPointerDevice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return { isPointerDevice };
}

function getSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback: () => void) {
  const pointerMediaQuery = window.matchMedia(FINE_POINTER_QUERY);

  pointerMediaQuery.addEventListener("change", callback);

  return () => {
    pointerMediaQuery.removeEventListener("change", callback);
  };
}
