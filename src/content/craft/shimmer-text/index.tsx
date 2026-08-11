import Card from "../../../components/card/Card";
import ShimmerText from "./components/ShimmerText";

import type { ContentEntryMetadata } from "../../collection";

export const metadata: ContentEntryMetadata = {
  title: "Shimmer Text",
  description: "Loading shimmer text from OpenAI o1.",
  publishedDate: "2024-09-13",
};

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
