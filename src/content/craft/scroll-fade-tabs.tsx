import ScrollFadeTabs from "../../app/craft/components/scroll-fade-tabs/ScrollFadeTabs";
import Card from "../../components/card/Card";
import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Scroll Fade Tabs",
  description: "Tab bar view with a scroll fade.",
  publishedDate: "2025-02-09",
};

export default function ScrollFadeTabsEntry() {
  return (
    <>
      <Heading>Scroll Fade Tabs</Heading>
      <p>Tab bar view with a scroll fade.</p>
      <Card>
        <ScrollFadeTabs />
      </Card>
    </>
  );
}
