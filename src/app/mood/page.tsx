import type { Metadata } from "next";

import Canvas from "./components/Canvas/Canvas";
import "./mood.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/mood",
  },
  title: "Mood",
  description: "A mood board inspiring my craft.",
};

export default function MoodPage() {
  return (
    <div className="mood-root">
      <Canvas />
    </div>
  );
}
