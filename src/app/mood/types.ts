import type { StaticImageData } from "next/image";

export interface CanvasElement {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  src: string | StaticImageData;
  alt?: string;
}
