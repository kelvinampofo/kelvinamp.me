import type { Metadata } from "next";

import MoodBoard from "./components/MoodBoard/MoodBoard";
import "./mood.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/mood",
  },
  title: "Mood",
  description: "A mood board of random stuff.",
};

export default function MoodPage() {
  return (
    <div className="mood-root">
      <MoodBoard />
    </div>
  );
}
