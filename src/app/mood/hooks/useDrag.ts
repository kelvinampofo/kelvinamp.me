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
  id: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  imageStartX: number;
  imageStartY: number;
}

interface PositionedImage {
  id: string;
  x: number;
  y: number;
}

interface UseDragOptions<T extends PositionedImage> {
  getScale: () => number;
  images: T[];
  setImages: Dispatch<SetStateAction<T[]>>;
}

const grab = {
  start: () => document.body.classList.add("gesture-grabbing"),
  end: () => document.body.classList.remove("gesture-grabbing"),
};

export default function useDrag<T extends PositionedImage>({
  getScale,
  images,
  setImages,
}: UseDragOptions<T>) {
  const activeDragRef = useRef<DragState | null>(null);

  const onPointerMove = useEffectEvent((event: PointerEvent) => {
    const activeDrag = activeDragRef.current;

    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;

    const scale = getScale();
    if (!scale) return;

    const deltaXInCanvasSpace =
      (event.clientX - activeDrag.startClientX) / scale;
    const deltaYInCanvasSpace =
      (event.clientY - activeDrag.startClientY) / scale;

    const nextImageX = activeDrag.imageStartX + deltaXInCanvasSpace;
    const nextImageY = activeDrag.imageStartY + deltaYInCanvasSpace;

    setImages((previousImages) =>
      previousImages.map((image) => {
        if (image.id !== activeDrag.id) return image;

        return {
          ...image,
          x: nextImageX,
          y: nextImageY,
        };
      })
    );
  });

  const onPointerEnd = useEffectEvent((event: PointerEvent) => {
    const activeDrag = activeDragRef.current;
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;

    activeDragRef.current = null;
    grab.end();
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

  function onImagePointerDown(
    id: string,
    pointerDownEvent: ReactPointerEvent<HTMLDivElement>
  ) {
    const initialPosition = images.find((image) => image.id === id);
    if (!initialPosition) return;

    activeDragRef.current = {
      id,
      pointerId: pointerDownEvent.pointerId,
      startClientX: pointerDownEvent.clientX,
      startClientY: pointerDownEvent.clientY,
      imageStartX: initialPosition.x,
      imageStartY: initialPosition.y,
    };

    pointerDownEvent.currentTarget.setPointerCapture(
      pointerDownEvent.pointerId
    );

    grab.start();

    pointerDownEvent.preventDefault();
    pointerDownEvent.stopPropagation();
  }

  return { onImagePointerDown };
}
