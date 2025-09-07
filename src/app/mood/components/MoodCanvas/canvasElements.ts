import { CanvasElement } from "../../types";

export const CANVAS_ELEMENTS = [
  {
    id: "mood:sketch",
    x: 440,
    y: 200,
    width: 340,
    height: 400,
    src: "/assets/images/mood/sketch.webp",
    alt: "Sketch",
  },
  {
    id: "mood:polaroids-bill-atkinson",
    x: 400,
    y: 580,
    width: 280,
    height: 220,
    src: "/assets/images/mood/bill-atkinson-lisa-polaroids.webp",
    alt: "Polaroids by Bill Atkinson",
  },
  {
    id: "mood:flow-diagram",
    x: 720,
    y: 218,
    width: 380,
    height: 260,
    src: "/assets/images/mood/flow-diagram.webp",
    alt: "Flow diagram",
  },
  {
    id: "mood:caravaggio",
    x: 800,
    y: 500,
    width: 400,
    height: 400,
    src: "/assets/images/mood/caravaggio.webp",
    alt: "Caravaggio",
  },
  {
    id: "mood:nasa-spacecraft-markings",
    x: 1130,
    y: 180,
    width: 600,
    height: 400,
    src: "/assets/images/mood/nasa-spacecraft-markings.webp",
    alt: "NASA Spacecraft Markings",
  },
] satisfies CanvasElement[];
