"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import useDrag from "../../../../hooks/useDrag";
import useShortcuts from "../../../../hooks/useShortcuts";
import useCanvasViewport from "../../hooks/useCanvasViewport";
import type { CanvasElement, ElementId } from "../../types";
import CanvasControls from "../CanvasControls/CanvasControls";

import { CANVAS_ELEMENTS } from "./canvasElements";
import styles from "./MoodCanvas.module.css";

const BASE_DELAY_MS = 5;
const STAGGER_MS = 150;

export default function MoodCanvas() {
  const [canvasElements, setCanvasElements] =
    useState<CanvasElement[]>(CANVAS_ELEMENTS);

  // reveal elements sequentially to introduce the space gradually
  const [revealedIds, setRevealedIds] = useState<Set<ElementId>>(new Set());
  const timeoutsRef = useRef<number[]>([]);

  const {
    canvas: { ref, pan, onPointerDown, onPointerMove },
    zoom: { scale, percent, zoomIn, zoomOut, reset, getScale },
  } = useCanvasViewport({ initialScale: 0.7 });

  const { onElementPointerDown } = useDrag({
    getScale,
    getInitialPositionById: (elementId: string) => {
      const element = canvasElements.find(
        (element) => element.id === elementId
      );
      return element ? { x: element.x, y: element.y } : undefined;
    },
    onDrag: ({ element }) => {
      setCanvasElements((previousElements) =>
        previousElements.map((canvasElement) => {
          if (canvasElement.id === element.id) {
            return {
              ...canvasElement,
              x: element.next.x,
              y: element.next.y,
            };
          }

          return canvasElement;
        })
      );
    },
  });

  useShortcuts(["=", "+"], zoomIn, { preventDefault: true, modifiers: "Meta" });
  useShortcuts("-", zoomOut, { preventDefault: true, modifiers: "Meta" });
  useShortcuts("0", reset, { preventDefault: true, modifiers: "Meta" });

  // schedule staggered visibility
  useEffect(() => {
    // clear any previous timers before scheduling again
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    CANVAS_ELEMENTS.forEach((element, index) => {
      const timeoutId = window.setTimeout(
        () => {
          setRevealedIds((prevRevealIds) => {
            const next = new Set(prevRevealIds);
            next.add(element.id);
            return next;
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

  return (
    <>
      <div
        ref={ref}
        className={styles.moodCanvas}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div
          className={styles.moodSurface}
          style={{
            // order matters here, first translate, then scale the whole surface
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          }}
        >
          {canvasElements.map((element) => {
            if (!revealedIds.has(element.id)) return null;

            return (
              <div
                key={element.id}
                data-element="true"
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
                  alt={element.alt ?? ""}
                  fill
                  unoptimized
                  objectFit="fill"
                />
              </div>
            );
          })}
        </div>
      </div>

      <CanvasControls
        zoomPercent={percent}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={reset}
      />
    </>
  );
}
