import type { StaticImageData } from "next/image";

export interface CanvasElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string | StaticImageData;
  alt?: string;
}
