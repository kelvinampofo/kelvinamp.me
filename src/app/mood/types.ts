export type ElementId = `mood:${string}`;

export interface CanvasElement {
  id: ElementId;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  alt?: string;
}
