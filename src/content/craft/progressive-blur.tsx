import ProgressiveBlur from "../../app/craft/components/progressive-blur/ProgressiveBlur";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Progressive Blur",
  description: "Progressive linear blur.",
  publishedDate: "2024-05-27",
};

export default function ProgressiveBlurEntry() {
  return (
    <>
      <Heading>Progressive Blur</Heading>
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
