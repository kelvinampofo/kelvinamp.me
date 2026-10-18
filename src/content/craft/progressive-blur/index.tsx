import Card from "../../../components/card/Card";

import ProgressiveBlur from "./components/ProgressiveBlur";

export default function ProgressiveBlurEntry() {
  return (
    <>
      <p>
        Progressive linear blur effect using <code>mask-image</code>.
      </p>
      <Card>
        <ProgressiveBlur>
          The quick brown fox jumps over the lazy dog. The five boxing wizards
          jump quickly.
        </ProgressiveBlur>
      </Card>
    </>
  );
}
