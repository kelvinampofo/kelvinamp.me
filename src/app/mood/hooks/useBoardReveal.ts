"use client";

import { useEffect, useState, type RefObject } from "react";

import { afterNextPaint } from "../../../utils/animation-frame";
import { ASSETS } from "../assets";

const MAX_BOARD_IMAGE_WAIT_MS = 1500;
const MAX_THUMBNAIL_WAIT_MS = 5000;
const LOADING_LABEL_DELAY_MS = 100;
const PREFERRED_STAGGER_INTERVAL_MS = 40;
const MAX_STAGGER_DURATION_MS = 800;
const STAGGER_FALLBACK_GRACE_MS = 250;

// cap the stagger as the board grows
const STAGGER_INTERVAL_MS = Math.min(
  PREFERRED_STAGGER_INTERVAL_MS,
  MAX_STAGGER_DURATION_MS / Math.max(ASSETS.length - 1, 1)
);

export type RevealState = "pending" | "loading" | "staggering" | "shown";

interface UseBoardRevealOptions {
  viewportRef: RefObject<HTMLElement | null>;
  surfaceRef: RefObject<HTMLElement | null>;
  minimapContentRef: RefObject<HTMLElement | null>;
}

export default function useBoardReveal({
  viewportRef,
  surfaceRef,
  minimapContentRef,
}: UseBoardRevealOptions) {
  const [revealState, setRevealState] = useState<RevealState>("pending");
  const [minimapImagesReady, setMinimapImagesReady] = useState(false);

  // wait until the board is centred before deciding which images are on screen
  useEffect(() => {
    const controller = new AbortController();

    function startStagger() {
      // start only once, whether the images finish loading or the timer runs out
      if (controller.signal.aborted) return;

      clearTimeout(imageWaitTimeoutId);
      clearTimeout(loadingLabelTimeoutId);
      controller.abort();
      setRevealState("staggering");
    }

    // show the board after a short wait even if some images are still loading
    const imageWaitTimeoutId = setTimeout(
      startStagger,
      MAX_BOARD_IMAGE_WAIT_MS
    );

    // fast visits should not flash a loading message
    const loadingLabelTimeoutId = setTimeout(
      () =>
        setRevealState((current) =>
          current === "pending" ? "loading" : current
        ),
      LOADING_LABEL_DELAY_MS
    );

    const cancelImagePreparation = afterNextPaint(async () => {
      const viewport = viewportRef.current?.getBoundingClientRect();
      const surface = surfaceRef.current;

      if (!viewport || !surface || controller.signal.aborted) return;

      // only wait for images the visitor can see
      const images = getVisibleImages(surface, viewport);
      await Promise.all(
        images.map((image) => {
          image.loading = "eager";
          return waitForImage(image, controller.signal);
        })
      );

      startStagger();
    });

    return () => {
      controller.abort();
      clearTimeout(imageWaitTimeoutId);
      clearTimeout(loadingLabelTimeoutId);
      cancelImagePreparation();
    };
  }, [viewportRef, surfaceRef]);

  // listen from mount, a reduced-motion stagger can end before a later effect runs
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === surface.lastElementChild) {
        setRevealState("shown");
      }
    };

    surface.addEventListener("animationend", handleAnimationEnd);
    return () =>
      surface.removeEventListener("animationend", handleAnimationEnd);
  }, [surfaceRef]);

  useEffect(() => {
    if (revealState !== "staggering") return;

    // animationend may not fire in background tabs
    const timeoutId = window.setTimeout(
      () => setRevealState("shown"),
      MAX_STAGGER_DURATION_MS + STAGGER_FALLBACK_GRACE_MS
    );

    return () => window.clearTimeout(timeoutId);
  }, [revealState]);

  useEffect(() => {
    const content = minimapContentRef.current;
    if (!content) return;

    const images = Array.from(content.querySelectorAll("img"));
    const controller = new AbortController();

    function finishThumbnailWait() {
      if (controller.signal.aborted) return;

      clearTimeout(thumbnailWaitTimeoutId);
      controller.abort();
      setMinimapImagesReady(true);
    }

    // show the minimap even if a thumbnail never loads
    const thumbnailWaitTimeoutId = setTimeout(
      finishThumbnailWait,
      MAX_THUMBNAIL_WAIT_MS
    );

    async function waitForThumbnails() {
      await Promise.all(
        images.map((image) => waitForImage(image, controller.signal))
      );

      finishThumbnailWait();
    }

    void waitForThumbnails();

    return () => {
      controller.abort();
      clearTimeout(thumbnailWaitTimeoutId);
    };
  }, [minimapContentRef]);

  return {
    revealState,
    minimapShown: revealState === "shown" && minimapImagesReady,
  };
}

export function getStaggerDelay(index: number) {
  return `${Math.round(index * STAGGER_INTERVAL_MS)}ms`;
}

function getVisibleImages(surface: HTMLElement, viewport: DOMRect) {
  return Array.from(surface.querySelectorAll("img")).filter((image) => {
    const bounds = image.getBoundingClientRect();

    // images at the edge of the screen count too
    return (
      bounds.right > viewport.left &&
      bounds.left < viewport.right &&
      bounds.bottom > viewport.top &&
      bounds.top < viewport.bottom
    );
  });
}

function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  if (signal.aborted) return Promise.resolve();

  return new Promise<void>((resolve) => {
    function finish() {
      image.removeEventListener("load", decode);
      image.removeEventListener("error", finish);
      signal.removeEventListener("abort", finish);
      resolve();
    }

    async function decode() {
      try {
        // downloading is not enough, the browser also needs to prepare the image for display
        await image.decode();
        finish();
      } catch {
        // skip broken images, but try again when a replacement image loads
        if (image.complete && image.naturalWidth === 0) {
          finish();
        }
      }
    }

    image.addEventListener("load", decode);
    image.addEventListener("error", finish);
    // stop waiting while the browser continues loading the image
    signal.addEventListener("abort", finish, { once: true });

    // try now too, since a cached image may already be loaded
    void decode();
  });
}
