import TimelinePicker from "../../app/craft/components/timeline-picker/TimelinePicker";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";


export const metadata = {
  title: "Timeline Picker",
  description: "Minimal timeline picker.",
  publishedDate: "2025-06-29",
};

export default function TimelinePickerEntry() {
  return (
    <>
      <Heading>Timeline Picker</Heading>
      <p>
        A timeline picker for navigating time-based or sequential data. A
        notable detail, often overlooked, is the increased hit area—improving
        the interface’s{" "}
        <a href="https://en.wikipedia.org/wiki/Affordance">affordance</a>. Simply
        an invisible <code>::after</code> pseudo-element with added padding for
        that one.
      </p>
      <Card>
        <TimelinePicker />
      </Card>
    </>
  );
}
