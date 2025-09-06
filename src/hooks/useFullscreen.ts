"use client";

import { useEffect, useState } from "react";

export default function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    const element = document.documentElement;

    setCanFullscreen(typeof element.requestFullscreen === "function");

    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  async function enterFullscreen() {
    await document.documentElement.requestFullscreen();
  }

  async function exitFullscreen() {
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
