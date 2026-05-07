import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";
import HoldToDelete from "../../craft/prototypes/hold-to-delete/HoldToDelete";

export const metadata = {
  title: "Hold to Delete",
  description: "“Hold to Delete” interaction.",
  publishedDate: "2024-06-09",
};

export default function HoldToDeleteEntry() {
  return (
    <>
      <Heading>Hold to Delete</Heading>
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
