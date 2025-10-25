"use client";

import { useEffect, useState } from "react";

export default function usePointerDevice() {
  const [isPointerDevice, setIsPointerDevice] = useState(
    () =>
      !!(
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches
      )
  );

  useEffect(() => {
    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    const pointerMediaQuery = window.matchMedia("(pointer: fine)");

    pointerMediaQuery.addEventListener("change", handlePointerChange);

    return () => {
      pointerMediaQuery.removeEventListener("change", handlePointerChange);
    };
  }, []);

  return { isPointerDevice };
}
