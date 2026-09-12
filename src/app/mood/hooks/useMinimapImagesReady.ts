"use client";

import { useEffect, useState, type RefObject } from "react";

const MAX_WAIT_MS = 5000;

/** Tracks when the minimap's fixed collection of images has settled. */
export default function useMinimapImagesReady(
  contentRef: RefObject<HTMLElement | null>,
  imageCount: number
) {
  const [minimapImagesReady, setMinimapImagesReady] = useState(false);

  useEffect(() => {
    const images = Array.from(
      contentRef.current?.querySelectorAll("img") ?? []
    );
    if (images.length !== imageCount) return;

    // wait until every thumbnail can paint
    const decoded = Promise.all(
      images.map((image) => image.decode().catch(() => undefined))
    );

    // never let one broken request hide the control
    const timeoutId = window.setTimeout(
      () => setMinimapImagesReady(true),
      MAX_WAIT_MS
    );

    void decoded.then(() => {
      window.clearTimeout(timeoutId);
      setMinimapImagesReady(true);
    });

    return () => window.clearTimeout(timeoutId);
  }, [contentRef, imageCount]);

  return minimapImagesReady;
}
