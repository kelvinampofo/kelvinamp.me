import AdaptiveInterface from "../../app/craft/components/adaptive-interface/AdaptiveInterface";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Adaptive Interface",
  description: "An adaptive interface based on usage.",
  publishedDate: "2025-01-10",
};

export default function AdaptiveInterfaceEntry() {
  return (
    <>
      <Heading>Adaptive Interface</Heading>
      <p>
        An adaptive interface based on usage. Inspired by this{" "}
        <a href="https://x.com/carmguti/status/1877132625388716124">tweet</a> on
        game design.
      </p>
      <Card>
        <AdaptiveInterface />
      </Card>
      <p>
        I was discussing a use case for this type of interface with a friend:
        what if the visual cues that help users learn keyboard shortcuts
        gradually disappeared after being used a specific number of times,
        encouraging recall through repetition? They reappear when accessed again
        via the graphical user interface, reinforcing learning through use. In
        essence, it would act as a form of behavioural reinforcement—keyboard
        training.
      </p>
    </>
  );
}
