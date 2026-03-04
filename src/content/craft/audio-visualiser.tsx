import AudioVisualiser from "../../app/craft/components/audio-visualiser/AudioVisualiser";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Audio visualiser",
  description: "Simulated audio-reactive visualiser.",
  publishedDate: "2026-03-01",
};

export default function AudioVisualiserEntry() {
  return (
    <>
      <Heading>Audio visualiser</Heading>
      <p>Simulated audio-reactive visualiser.</p>
      <Card
        style={{
          "--card-content-height": "auto",
          "--card-content-aspect-ratio": "16 / 9",
        }}
      >
        <AudioVisualiser />
      </Card>
    </>
  );
}
