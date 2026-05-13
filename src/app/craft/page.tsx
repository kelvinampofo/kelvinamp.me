import type { Metadata } from "next";

import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getContentEntries } from "../../utils/content-collection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/craft",
  },
  title: "Craft",
  description: "A collection of interface and interaction experiments.",
};

export default async function CraftPage() {
  const entries = await getContentEntries("craft");

  return (
    <>
      <Heading>Craft</Heading>
      <p className="description">
        Collection of interfaces <em>&</em> interactions.
      </p>
      <List entries={entries} collection="craft" />
    </>
  );
}
