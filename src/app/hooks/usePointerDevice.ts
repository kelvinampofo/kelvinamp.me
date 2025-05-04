"use client";

import { useEffect, useState } from "react";

export default function usePointerDevice() {
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  useEffect(() => {
    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    const pointerMediaQuery = window.matchMedia("(pointer: fine)");

    setIsPointerDevice(pointerMediaQuery.matches);

    pointerMediaQuery.addEventListener("change", handlePointerChange);

    return () => {
      pointerMediaQuery.removeEventListener("change", handlePointerChange);
    };
  }, []);

  return { isPointerDevice };
}
