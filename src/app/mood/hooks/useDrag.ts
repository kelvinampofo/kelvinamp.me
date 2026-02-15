"use client";

import {
  type Dispatch,
  PointerEvent as ReactPointerEvent,
  type SetStateAction,
  useRef,
} from "react";

import { type CanvasImage } from "../images";

interface Point {
  x: number;
  y: number;
}

interface DragState {
  pointerId: number;
  imageId: string;
  startClient: Point;
  startImage: Point;
}

interface UseDragOptions {
  images: CanvasImage[];
  setImages: Dispatch<SetStateAction<CanvasImage[]>>;
  getScale: () => number;
}

const grab = {
  start: () => document.body.classList.add("gesture-grabbing"),
  end: () => document.body.classList.remove("gesture-grabbing"),
};

export default function useDrag({
  images,
  setImages,
  getScale,
}: UseDragOptions) {
  const activeDragRef = useRef<DragState | null>(null);

  function onPointerDown(
    imageId: string,
    pointerDownEvent: ReactPointerEvent<HTMLDivElement>
  ) {
    const isPrimaryButton = pointerDownEvent.button === 0;
    const isCtrlClick = pointerDownEvent.ctrlKey;
    const shouldSkipPan = !isPrimaryButton || isCtrlClick;

    if (shouldSkipPan) {
      pointerDownEvent.stopPropagation();
      return;
    }

    const initialPosition = images.find((image) => image.id === imageId);
    if (!initialPosition) return;

    activeDragRef.current = {
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

    pointerDownEvent.currentTarget.setPointerCapture(
      pointerDownEvent.pointerId
    );

    grab.start();

    pointerDownEvent.preventDefault();
    pointerDownEvent.stopPropagation();
  }

  function onPointerMove(pointerMoveEvent: ReactPointerEvent<HTMLDivElement>) {
    const activeDrag = activeDragRef.current;

    if (
      !activeDrag ||
      pointerMoveEvent.pointerId !== activeDrag.pointerId
    ) {
      return;
    }

    const scale = getScale();

    if (!scale) return;

    const deltaXInCanvasSpace =
      (pointerMoveEvent.clientX - activeDrag.startClient.x) / scale;
    const deltaYInCanvasSpace =
      (pointerMoveEvent.clientY - activeDrag.startClient.y) / scale;

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

    grab.end();
  }

  function onPointerUp(pointerUpEvent: ReactPointerEvent<HTMLDivElement>) {
    endDrag(pointerUpEvent.pointerId);

    pointerUpEvent.preventDefault();
    pointerUpEvent.stopPropagation();
  }

  return { onPointerDown, onPointerMove, onPointerUp };
}
