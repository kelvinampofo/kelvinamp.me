import type { Metadata } from "next";

import Heading from "../../components/heading/Heading";
import List, { type ListEntry } from "../../components/list/List";
import Page from "../../components/page/Page";
import { getContentEntries, sortByNewest } from "../../content/collection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/craft",
  },
  title: "Craft",
  description: "A collection of interface and interaction experiments.",
};

const MOOD_ITEM = {
  slug: "mood",
  href: "/mood",
  title: "Mood",
  description: "A mood board of random stuff.",
  publishedDate: "2025-09-06",
} satisfies ListEntry;

export default async function CraftPage() {
  const entries = await getContentEntries("craft");

  const items = sortByNewest([...entries, MOOD_ITEM]);

  return (
    <Page backTo="/">
      <Heading>Craft</Heading>
      <p className="description">
        Collection of interfaces <em>&</em> interactions.
      </p>
      <List
        entries={items}
        collection="craft"
        showDescriptions
        dateFormat={{ month: "long" }}
      />
    </Page>
  );
}
