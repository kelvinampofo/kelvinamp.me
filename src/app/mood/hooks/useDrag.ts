"use client";

import {
  type Dispatch,
  PointerEvent as ReactPointerEvent,
  type SetStateAction,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";

import { type CanvasImage } from "../images";

interface DragState {
  pointerId: number;
  imageId: string;
  startClientX: number;
  startClientY: number;
  startImageX: number;
  startImageY: number;
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

  function onPanStart(
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
      startClientX: pointerDownEvent.clientX,
      startClientY: pointerDownEvent.clientY,
      startImageX: initialPosition.x,
      startImageY: initialPosition.y,
    };

    pointerDownEvent.currentTarget.setPointerCapture(
      pointerDownEvent.pointerId
    );

    grab.start();

    pointerDownEvent.preventDefault();
    pointerDownEvent.stopPropagation();
  }

  const onPointerMove = useEffectEvent((event: PointerEvent) => {
    const activeDrag = activeDragRef.current;

    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;

    const scale = getScale();

    if (!scale) return;

    const deltaXInCanvasSpace =
      (event.clientX - activeDrag.startClientX) / scale;
    const deltaYInCanvasSpace =
      (event.clientY - activeDrag.startClientY) / scale;

    const nextImageX = activeDrag.startImageX + deltaXInCanvasSpace;
    const nextImageY = activeDrag.startImageY + deltaYInCanvasSpace;

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
  });

  function endDrag(pointerId: number) {
    const activeDrag = activeDragRef.current;

    if (!activeDrag || pointerId !== activeDrag.pointerId) return;

    activeDragRef.current = null;

    grab.end();
  }

  function onPanEnd(pointerUpEvent: ReactPointerEvent<HTMLDivElement>) {
    endDrag(pointerUpEvent.pointerId);

    pointerUpEvent.preventDefault();
    pointerUpEvent.stopPropagation();
  }

  const onPointerEnd = useEffectEvent((event: PointerEvent) => {
    endDrag(event.pointerId);
  });

  useEffect(() => {
    const controller = new AbortController();

    const { signal } = controller;

    window.addEventListener("pointermove", onPointerMove, { signal });
    window.addEventListener("pointerup", onPointerEnd, { signal });
    window.addEventListener("pointercancel", onPointerEnd, { signal });

    return () => {
      controller.abort();
    };
  }, []);

  return { onPanStart, onPanEnd };
}
