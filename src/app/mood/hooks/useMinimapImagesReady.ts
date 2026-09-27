"use client";

import { useEffect, useState, type RefObject } from "react";

import { waitForImage } from "../images";

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
      // wait for the thumbnails so they appear together
      await Promise.all(
        images.map((image) => waitForImage(image, controller.signal))
      );

      clearTimeout(timeoutId);

      // only show the minimap if we are still waiting for it
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
