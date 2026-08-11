import Card from "../../../components/card/Card";
import type { ContentEntryMetadata } from "../../collection";

import HoldToDelete from "./components/HoldToDelete";

export const metadata: ContentEntryMetadata = {
  title: "Hold to Delete",
  description: "“Hold to Delete” interaction.",
  publishedDate: "2024-06-09",
};

export default function HoldToDeleteEntry() {
  return (
    <>
      <p>
        Uses <code>clip-path</code> to animate the progress—leveraging{" "}
        <a href="https://en.wikipedia.org/wiki/Hardware_acceleration">
          hardware acceleration
        </a>
        for a more efficient interaction.
      </p>
      <p>
        My favourite detail is the Safari <code>theme-colour</code> tint that
        responds to user action, driven by a script interpolating colour stops
        for a smooth animation.
      </p>
      <Card>
        <HoldToDelete />
      </Card>
    </>
  );
}
