"use client";

import { useSyncExternalStore } from "react";

export default function useFullscreen() {
  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    getFullscreenSnapshot,
    getServerSnapshot
  );

  const canFullscreen = useSyncExternalStore(
    subscribeFullscreenSupport,
    getFullscreenSupportSnapshot,
    getServerSnapshot
  );

  async function enterFullscreen() {
    if (!canFullscreen) return;

    await document.documentElement.requestFullscreen();
  }

  async function exitFullscreen() {
    if (!isFullscreen) return;

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

function getFullscreenSnapshot() {
  return !!document.fullscreenElement;
}

function getFullscreenSupportSnapshot() {
  return typeof document.documentElement.requestFullscreen === "function";
}

function getServerSnapshot() {
  return false;
}

function subscribeFullscreen(callback: () => void) {
  document.addEventListener("fullscreenchange", callback);
  document.addEventListener("fullscreenerror", callback);

  return () => {
    document.removeEventListener("fullscreenchange", callback);
    document.removeEventListener("fullscreenerror", callback);
  };
}

function subscribeFullscreenSupport() {
  return () => undefined;
}
