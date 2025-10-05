import type { Metadata } from "next";

import Canvas from "./components/Canvas/Canvas";
import "./mood.css";

export const metadata: Metadata = {
  title: "Mood",
  description: "A mood board inspiring my craft.",
  metadataBase: new URL("https://kelvinamp.me/mood"),
};

export default function MoodPage() {
  return (
    <div className="mood-root">
      <Canvas />
    </div>
  );
}
