import Card from "../../../components/card/Card";
import NumericScrubber from "./components/NumericScrubber";

import type { ContentEntryMetadata } from "../../collection";

export const metadata: ContentEntryMetadata = {
  title: "Numeric scrubber",
  description: "Inline numeric scrubber.",
  publishedDate: "2026-01-11",
};

export default function NumericScrubberEntry() {
  return (
    <>
      <p>
        A re-implementation of Apple’s Math Notes number scrubbing—
        <span data-pointer="only">
          hover over the number and drag the slider to change the value
          interactively.
        </span>
        <span data-touch="only">
          tap the number and swipe left/right to adjust the value interactively.
        </span>
      </p>
      <Card>
        <NumericScrubber />
      </Card>
    </>
  );
}
