import Card from "../../../components/card/Card";
import type { ContentEntryMetadata } from "../../collection";

import HoldForSound from "./components/HoldForSound";

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
