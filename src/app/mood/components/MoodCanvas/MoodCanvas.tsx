"use client";

import Image from "next/image";
import { useState } from "react";

import useDrag from "../../../../hooks/useDrag";
import useShortcuts from "../../../../hooks/useShortcuts";
import useCanvasViewport from "../../hooks/useCanvasViewport";
import type { CanvasElement } from "../../types";
import ZoomControls from "../ZoomControls/ZoomControls";

import { CANVAS_ELEMENTS } from "./canvasElements";
import styles from "./MoodCanvas.module.css";

export default function MoodCanvas() {
  const [canvasElements, setCanvasElements] =
    useState<CanvasElement[]>(CANVAS_ELEMENTS);

  const {
    canvasRef,
    canvasScale,
    canvasPan,
    zoomPercent,
    zoomIn,
    zoomOut,
    resetZoom,
    handleCanvasPointerDown,
    handleCanvasPointerMove,
    getScale,
  } = useCanvasViewport();

  const { onElementPointerDown } = useDrag({
    getScale,
    getInitialPositionById: (elementId: string) => {
      const element = canvasElements.find((e) => e.id === elementId);
      return element ? { x: element.x, y: element.y } : undefined;
    },
    onDrag: ({ id, nextElementX, nextElementY }) => {
      setCanvasElements((prev) =>
        prev.map((element) => {
          if (element.id === id) {
            return { ...element, x: nextElementX, y: nextElementY };
          }

          return element;
        })
      );
    },
  });

  useShortcuts(["=", "+"], zoomIn, { preventDefault: true, modifiers: "Meta" });
  useShortcuts("-", zoomOut, { preventDefault: true, modifiers: "Meta" });
  useShortcuts("0", resetZoom, { preventDefault: true, modifiers: "Meta" });

  return (
    <>
      <div
        ref={canvasRef}
        className={styles.moodCanvas}
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handleCanvasPointerMove}
        style={{
          // order matters here, first translate, then scale the whole surface
          transform: `translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${canvasScale})`,
        }}
      >
        <div className={styles.moodSurface}>
          {canvasElements.map((element) => (
            <div
              key={element.id}
              data-element
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
                sizes={`${element.width}px`}
                objectFit="fill"
              />
            </div>
          ))}
        </div>
      </div>

      <ZoomControls
        zoomPercent={zoomPercent}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />
    </>
  );
}
