"use client";

import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";

import useDrag from "../../../../hooks/useDrag";
import useFullscreen from "../../../../hooks/useFullscreen";
import useShortcuts from "../../../../hooks/useShortcuts";
import { CANVAS_ELEMENTS } from "../../elements";
import useCanvasCamera from "../../hooks/useCanvasCamera";

import styles from "./Canvas.module.css";

const BASE_DELAY_MS = 5;
const STAGGER_MS = 150;

export default function Canvas() {
  const [canvasElements, setCanvasElements] = useState(() => CANVAS_ELEMENTS);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const { camera, cameraRef, onPointerDown, zoomIn, zoomOut } = useCanvasCamera(
    { canvasRef }
  );

  const { toggleFullscreen } = useFullscreen();

  useShortcuts("F", toggleFullscreen, { preventDefault: true });

  useShortcuts(["Equal", "NumpadAdd"], zoomIn, {
    preventDefault: true,
    modifiers: "Meta",
    matchBy: "code",
  });

  useShortcuts(["Minus", "NumpadSubtract"], zoomOut, {
    preventDefault: true,
    modifiers: "Meta",
    matchBy: "code",
  });

  const { onElementPointerDown } = useDrag({
    getScale: () => cameraRef.current.z,
    getInitialPositionById,
    onDrag: handleElementDrag,
  });

  // reveal elements sequentially to introduce the space gradually
  useEffect(() => {
    CANVAS_ELEMENTS.forEach((element, index) => {
      const timeoutId = window.setTimeout(
        () => {
          startTransition(() => {
            setRevealedIds((previousRevealIds) => {
              const next = new Set(previousRevealIds);
              next.add(element.id);

              return next;
            });
          });
        },
        BASE_DELAY_MS + index * STAGGER_MS
      );

      timeoutsRef.current.push(timeoutId);
    });

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  function getInitialPositionById(elementId: string) {
    const element = canvasElements.find((item) => item.id === elementId);
    return element ? { x: element.x, y: element.y } : undefined;
  }

  function handleElementDrag({
    element,
  }: {
    element: { id: string; next: { x: number; y: number } };
  }) {
    setCanvasElements((previousElements) =>
      previousElements.map((previousElement) => {
        if (previousElement.id === element.id) {
          return {
            ...previousElement,
            x: element.next.x,
            y: element.next.y,
          };
        }

        return previousElement;
      })
    );
  }

  return (
    <div
      ref={canvasRef}
      className={styles.moodCanvas}
      onPointerDown={onPointerDown}
    >
      <div
        className={styles.moodSurface}
        style={{
          // order matters here: first scale, then translate
          transform: `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`,
        }}
      >
        {canvasElements.map((element) => {
          if (!revealedIds.has(element.id)) return null;

          return (
            <div
              key={element.id}
              className={styles.moodElement}
              onPointerDown={onElementPointerDown(element.id)}
              style={{
                width: element.width,
                height: element.height,
                transform: `translate3d(${element.x}px, ${element.y}px, 0)`,
              }}
            >
              <Image
                src={element.src}
                alt={element.alt}
                fill
                className={styles.moodImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
