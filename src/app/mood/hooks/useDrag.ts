"use client";

import {
  type Dispatch,
  PointerEvent as ReactPointerEvent,
  type SetStateAction,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";

interface DragState {
  pointerId: number;
  imageId: string;
  startClientX: number;
  startClientY: number;
  startImageX: number;
  startImageY: number;
}

interface DraggableImage {
  id: string;
  x: number;
  y: number;
}

interface UseDragOptions<T extends DraggableImage> {
  images: T[];
  setImages: Dispatch<SetStateAction<T[]>>;
  getScale: () => number;
}

const grab = {
  start: () => document.body.classList.add("gesture-grabbing"),
  end: () => document.body.classList.remove("gesture-grabbing"),
};

export default function useDrag<T extends DraggableImage>({
  images,
  setImages,
  getScale,
}: UseDragOptions<T>) {
  const activeDragRef = useRef<DragState | null>(null);

  function endDrag(pointerId: number) {
    const activeDrag = activeDragRef.current;
    if (!activeDrag || pointerId !== activeDrag.pointerId) return;

    activeDragRef.current = null;

    grab.end();
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

  useEffect(() => {
    return () => {
      activeDragRef.current = null;
      grab.end();
    };
  }, []);

  function onPanStart(
    id: string,
    pointerDownEvent: ReactPointerEvent<HTMLDivElement>
  ) {
    const initialPosition = images.find((image) => image.id === id);
    if (!initialPosition) return;

    activeDragRef.current = {
      pointerId: pointerDownEvent.pointerId,
      imageId: id,
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

  function onPanEnd(pointerUpEvent: ReactPointerEvent<HTMLDivElement>) {
    endDrag(pointerUpEvent.pointerId);

    pointerUpEvent.preventDefault();
    pointerUpEvent.stopPropagation();
  }

  return { onPanStart, onPanEnd };
}
