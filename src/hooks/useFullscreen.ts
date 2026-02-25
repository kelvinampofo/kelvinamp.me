"use client";

import { useSyncExternalStore } from "react";

function subscribeFullscreenChanges(callback: () => void) {
  if (typeof document === "undefined") {
    return () => undefined;
  }

  function handleChange() {
    callback();
  }

  document.addEventListener("fullscreenchange", handleChange);
  document.addEventListener("fullscreenerror", handleChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleChange);
    document.removeEventListener("fullscreenerror", handleChange);
  };
}

function isFullscreenSnapshot() {
  return !!(typeof document !== "undefined" && document.fullscreenElement);
}

function canUseFullscreenSnapshot() {
  return !!(
    typeof document !== "undefined" &&
    typeof document.documentElement.requestFullscreen === "function"
  );
}

function getServerSnapshot() {
  return false;
}

function noopSubscribe() {
  return () => undefined;
}

export default function useFullscreen() {
  const isFullscreen = useSyncExternalStore(
    subscribeFullscreenChanges,
    isFullscreenSnapshot,
    getServerSnapshot
  );

  const canFullscreen = useSyncExternalStore(
    noopSubscribe,
    canUseFullscreenSnapshot,
    getServerSnapshot
  );

  async function enterFullscreen() {
    if (!canFullscreen || typeof document === "undefined") return;
    await document.documentElement.requestFullscreen();
  }

  async function exitFullscreen() {
    if (!isFullscreen || typeof document === "undefined") return;
    await document.exitFullscreen();
  }

  function toggleFullscreen() {
    if (!canFullscreen) return;

    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }

  return {
    isFullscreen,
    canFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}
