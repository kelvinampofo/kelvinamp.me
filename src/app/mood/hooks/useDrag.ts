"use client";

import {
  type Dispatch,
  PointerEvent as ReactPointerEvent,
  type SetStateAction,
  useState,
  useRef,
} from "react";

import { type CanvasImage } from "../images";

interface Point {
  x: number;
  y: number;
}

interface DragState {
  state: "idle" | "press" | "drag";
  pointerId: number;
  imageId: string;
  startClient: Point;
  startImage: Point;
}

interface UseDragOptions {
  images: CanvasImage[];
  setImages: Dispatch<SetStateAction<CanvasImage[]>>;
  getScale: () => number;
  isPanModeEnabled: boolean;
  threshold?: number;
}

export default function useDrag({
  images,
  setImages,
  getScale,
  isPanModeEnabled,
  threshold = 10,
}: UseDragOptions) {
  const activeDragRef = useRef<DragState | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  function onPointerDown(
    imageId: string,
    pointerDownEvent: ReactPointerEvent<HTMLDivElement>
  ) {
    if (isPanModeEnabled) return;

    if (pointerDownEvent.button !== 0 || pointerDownEvent.ctrlKey) {
      pointerDownEvent.stopPropagation();
      return;
    }

    const initialPosition = images.find((image) => image.id === imageId);
    if (!initialPosition) return;

    activeDragRef.current = {
      state: "press",
      pointerId: pointerDownEvent.pointerId,
      imageId,
      startClient: {
        x: pointerDownEvent.clientX,
        y: pointerDownEvent.clientY,
      },
      startImage: {
        x: initialPosition.x,
        y: initialPosition.y,
      },
    };
    setActiveDragId(imageId);

    pointerDownEvent.currentTarget.setPointerCapture(
      pointerDownEvent.pointerId
    );

    pointerDownEvent.preventDefault();
    pointerDownEvent.stopPropagation();
  }

  function onPointerMove(pointerMoveEvent: ReactPointerEvent<HTMLDivElement>) {
    const activeDrag = activeDragRef.current;

    if (!activeDrag || pointerMoveEvent.pointerId !== activeDrag.pointerId) {
      return;
    }

    const scale = getScale();

    if (!scale) return;

    const deltaX = pointerMoveEvent.clientX - activeDrag.startClient.x;
    const deltaY = pointerMoveEvent.clientY - activeDrag.startClient.y;

    const movement = Math.hypot(deltaX, deltaY);

    // A small drag hysteresis prevents incidental pointer jitter from
    // immediately promoting a press into an active drag.
    if (activeDrag.state === "press" && movement < threshold) {
      return;
    }

    if (activeDrag.state === "press") {
      activeDragRef.current = {
        ...activeDrag,
        state: "drag",
      };
    }

    const deltaXInCanvasSpace = deltaX / scale;
    const deltaYInCanvasSpace = deltaY / scale;

    const nextImageX = activeDrag.startImage.x + deltaXInCanvasSpace;
    const nextImageY = activeDrag.startImage.y + deltaYInCanvasSpace;

    setImages((previousImages) =>
      previousImages.map((image) => {
        if (image.id !== activeDrag.imageId) return image;

        return {
          ...image,
          x: nextImageX,
          y: nextImageY,
        };
      })
    );
  }

  function endDrag(pointerId: number) {
    const activeDrag = activeDragRef.current;

    if (!activeDrag || pointerId !== activeDrag.pointerId) return;

    activeDragRef.current = null;
    setActiveDragId(null);
  }

  function onPointerUp(pointerUpEvent: ReactPointerEvent<HTMLDivElement>) {
    endDrag(pointerUpEvent.pointerId);

    pointerUpEvent.preventDefault();
    pointerUpEvent.stopPropagation();
  }

  return { activeDragId, onPointerDown, onPointerMove, onPointerUp };
}
