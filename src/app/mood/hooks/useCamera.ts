"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";

import {
  centreCamera,
  INITIAL_CAMERA,
  toCameraTransform,
  type Camera,
  type Placements,
  type Size,
} from "../canvas";

type CameraListener = (camera: Camera) => void;

export interface CameraHandle {
  get: () => Camera;
  move: (update: (current: Camera, viewport: Size) => Camera) => void;
  subscribe: (listener: CameraListener) => () => void;
}

interface UseCameraOptions {
  viewportRef: RefObject<HTMLElement | null>;
  surfaceRef: RefObject<HTMLElement | null>;
  initialPlacements: Placements;
}

export default function useCamera({
  viewportRef,
  surfaceRef,
  initialPlacements,
}: UseCameraOptions) {
  // only resizes re-render, camera moves go straight to the dom
  const [viewport, setViewport] = useState<Size>({ width: 0, height: 0 });
  const viewportSizeRef = useRef(viewport);
  const cameraRef = useRef(INITIAL_CAMERA);

  const [camera] = useState<CameraHandle>(() => {
    const listeners = new Set<CameraListener>();

    return {
      get: () => cameraRef.current,
      move(update) {
        const next = update(cameraRef.current, viewportSizeRef.current);
        cameraRef.current = next;

        if (surfaceRef.current) {
          surfaceRef.current.style.transform = toCameraTransform(next);
        }

        listeners.forEach((listener) => listener(next));
      },
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
    };
  });

  const initialPlacementsRef = useRef(initialPlacements);

  useLayoutEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    function resize({ width, height }: Size) {
      viewportSizeRef.current = {
        width: width || window.innerWidth,
        height: height || window.innerHeight,
      };
      setViewport(viewportSizeRef.current);
    }

    resize(element.getBoundingClientRect());

    // centre before the first paint so the reveal sees which artwork is on screen
    camera.move((current, size) =>
      centreCamera(current, initialPlacementsRef.current, size)
    );

    const resizeObserver = new ResizeObserver(([entry]) =>
      resize(entry.contentRect)
    );

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [camera, viewportRef]);

  return { camera, viewport };
}
