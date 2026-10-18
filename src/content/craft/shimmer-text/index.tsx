import Card from "../../../components/card/Card";

import ShimmerText from "./components/ShimmerText";

export default function ShimmerTextEntry() {
  return (
    <>
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
