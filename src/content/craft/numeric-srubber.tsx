import NumericScrubber from "../../app/craft/components/number-scrubber/NumericScrubber";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Numeric scrubber",
  description: "Inline numeric scrubber.",
  publishedDate: "2026-01-11",
};

export default function NumericScrubberEntry() {
  return (
    <>
      <Heading>Numeric scrubber</Heading>
      <p>
        A re-implementation of Apple’s Math Notes number scrubbing—
        <span data-pointer="only">
          Hover over the number and drag the slider to change the value
          interactively.
        </span>
        <span data-touch="only">
          Tap the number and swipe left/right to adjust the value interactively.
        </span>
      </p>
      <Card>
        <NumericScrubber />
      </Card>
    </>
  );
}
