import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";
import HoldForSound from "../../craft/prototypes/hold-for-sound/HoldForSound";

export const metadata = {
  title: "Hold for Sound",
  description: "“Hold for Sound” interaction.",
  publishedDate: "2025-04-05",
};

export default function HoldForSoundEntry() {
  return (
    <>
      <Heading>Hold for Sound</Heading>
      <p>Audio interface.</p>
      <Card>
        <HoldForSound />
      </Card>
    </>
  );
}
