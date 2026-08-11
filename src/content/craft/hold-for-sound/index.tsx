import Card from "../../../components/card/Card";
import HoldForSound from "./components/HoldForSound";

import type { ContentEntryMetadata } from "../../collection";

export const metadata: ContentEntryMetadata = {
  title: "Hold for Sound",
  description: "“Hold for Sound” interaction.",
  publishedDate: "2025-04-05",
};

export default function HoldForSoundEntry() {
  return (
    <>
      <p>Audio interface.</p>
      <Card>
        <HoldForSound />
      </Card>
    </>
  );
}
