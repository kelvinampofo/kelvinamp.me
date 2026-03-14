"use client";

import clsx from "clsx";
import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";

import useFullscreen from "../../../../hooks/useFullscreen";
import useShortcuts from "../../../../hooks/useShortcuts";
import useCanvasCamera from "../../hooks/useCanvasCamera";
import useDrag from "../../hooks/useDrag";
import { CANVAS_IMAGES } from "../../images";
import { isIntersecting } from "../../utils/isIntersecting";

import styles from "./Canvas.module.css";

const BASE_DELAY_MS = 5;
const STAGGER_MS = 150;

export default function Canvas() {
  const [canvasImages, setCanvasImages] = useState(() => CANVAS_IMAGES);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());
  const [isPanModeEnabled, setIsPanModeEnabled] = useState(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const elementRefs = useRef(new Map<string, HTMLDivElement>());

  const {
    camera,
    cameraRef,
    onPointerDown: onPan,
    zoomIn,
    zoomOut,
  } = useCanvasCamera({ canvasRef, isPanModeEnabled });

  const { toggleFullscreen } = useFullscreen();

  const { activeDragId, onPointerDown, onPointerMove, onPointerUp } = useDrag({
    images: canvasImages,
    setImages: setCanvasImages,
    getScale: () => cameraRef.current.z,
    isPanModeEnabled,
  });

  useShortcuts({ F: toggleFullscreen }, { preventDefault: true });

  useShortcuts({
    H: () => setIsPanModeEnabled(true),
    V: () => setIsPanModeEnabled(false),
  });

  useShortcuts(
    {
      Equal: zoomIn,
      NumpadAdd: zoomIn,
      Minus: zoomOut,
      NumpadSubtract: zoomOut,
    },
    {
      preventDefault: true,
      modifiers: "Meta",
      matchBy: "code",
    }
  );

  // stagger the reveal of loaded images
  useEffect(() => {
    const timeoutIds = CANVAS_IMAGES.map(({ id }, index) =>
      window.setTimeout(
        () =>
          startTransition(() => {
            setRevealedIds((previousRevealIds) => {
              const next = new Set(previousRevealIds);
              next.add(id);
              return next;
            });
          }),
        BASE_DELAY_MS + index * STAGGER_MS
      )
    );

    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    if (!activeDragId) return;

    const draggedElement = elementRefs.current.get(activeDragId);

    if (!draggedElement) return;

    const isIntersectingAnotherElement = canvasImages.some(({ id }) => {
      if (id === activeDragId) return false;

      const element = elementRefs.current.get(id);
      return element ? isIntersecting(draggedElement, element) : false;
    });

    if (!isIntersectingAnotherElement) return;

    const animationFrameId = window.requestAnimationFrame(() => {
      setCanvasImages((previousImages) => {
        const activeImageIndex = previousImages.findIndex(
          (image) => image.id === activeDragId
        );

        if (
          activeImageIndex === -1 ||
          activeImageIndex === previousImages.length - 1
        ) {
          return previousImages;
        }

        const nextImages = [...previousImages];
        const [activeImage] = nextImages.splice(activeImageIndex, 1);
        nextImages.push(activeImage);

        return nextImages;
      });
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [activeDragId, canvasImages]);

  function setElementRef(id: string, element: HTMLDivElement | null) {
    if (element) {
      elementRefs.current.set(id, element);
      return;
    }

    elementRefs.current.delete(id);
  }

  return (
    <div
      ref={canvasRef}
      className={clsx(styles.moodCanvas, {
        [styles.panMode]: isPanModeEnabled,
      })}
      onPointerDown={onPan}
    >
      <div
        className={styles.moodSurface}
        style={{
          transform: `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`,
        }}
      >
        {canvasImages.map(({ id, width, height, x, y, src, alt }) => {
          if (!revealedIds.has(id)) return null;

          return (
            <div
              key={id}
              ref={(element) => setElementRef(id, element)}
              className={styles.moodElement}
              onPointerDown={(event) => onPointerDown(id, event)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                width,
                height,
                transform: `translate3d(${x}px, ${y}px, 0)`,
              }}
            >
              <Image src={src} alt={alt} fill className={styles.moodImage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
