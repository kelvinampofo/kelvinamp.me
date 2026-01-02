import ShimmerText from "../../app/craft/components/shimmer-text/ShimmerText";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";


export const metadata = {
  title: "Shimmer Text",
  description: "Loading shimmer text from OpenAI o1.",
  publishedDate: "2024-09-13",
};

export default function ShimmerTextEntry() {
  return (
    <>
      <Heading>Shimmer Text</Heading>
      <p>
        Loading shimmer text from{" "}
        <a href="https://openai.com/o1/#ui-video">OpenAI o1</a>.
      </p>
      <Card>
        <ShimmerText>
          {[
            "Crafting the solution",
            "Thinking",
            "Analysing",
            "Searching the web",
            "Assessing",
            "Reasoning",
          ]}
        </ShimmerText>
      </Card>
    </>
  );
}
