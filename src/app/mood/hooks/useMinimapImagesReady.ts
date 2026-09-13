"use client";

import { useEffect, useState, type RefObject } from "react";

const MAX_WAIT_MS = 5000;

export default function useMinimapImagesReady(
  contentRef: RefObject<HTMLElement | null>
) {
  const [minimapImagesReady, setMinimapImagesReady] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const images = Array.from(content.querySelectorAll("img"));
    const controller = new AbortController();

    // show the minimap even if a thumbnail never loads
    const timeoutId = setTimeout(() => {
      setMinimapImagesReady(true);
      controller.abort();
    }, MAX_WAIT_MS);

    async function waitForImages() {
      await Promise.all(
        images.map((image) => waitForImage(image, controller.signal))
      );

      clearTimeout(timeoutId);

      if (!controller.signal.aborted) setMinimapImagesReady(true);
      controller.abort();
    }

    void waitForImages();

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [contentRef]);

  return minimapImagesReady;
}

function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    async function decode() {
      try {
        await image.decode();
        resolve();
      } catch {
        // a source change interrupts decoding, retry when the new image loads
        if (image.complete && image.naturalWidth === 0) resolve();
      }
    }

    image.addEventListener("load", decode, { signal });
    image.addEventListener("error", () => resolve(), { signal });
    signal.addEventListener("abort", () => resolve(), { once: true });

    void decode();
  });
}
