"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/** tracks when the minimap's fixed collection of images has settled */
export default function useMinimapImagesReady(
  contentRef: RefObject<HTMLElement | null>,
  imageCount: number
) {
  const [minimapImagesReady, setMinimapImagesReady] = useState(false);

  function checkMinimapImages() {
    setMinimapImagesReady(imagesReady(contentRef.current, imageCount));
  }

  useLayoutEffect(() => {
    setMinimapImagesReady(imagesReady(contentRef.current, imageCount));
  }, [contentRef, imageCount]);

  return { minimapImagesReady, checkMinimapImages };
}

function imagesReady(element: HTMLElement | null, imageCount: number) {
  const images = Array.from(element?.querySelectorAll("img") ?? []);

  return (
    images.length === imageCount && images.every((image) => image.complete)
  );
}
