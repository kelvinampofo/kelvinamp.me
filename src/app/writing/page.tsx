import type { Metadata } from "next";
import Link from "next/link";

import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getContentEntries } from "../../utils/content-collection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/writing",
  },
  title: "Writing",
  description:
    "Infrequent thoughts on software and design, along with a running list of curated words.",
};

export default async function WritingPage() {
  const entries = await getContentEntries("writing");

  return (
    <>
      <Heading>Writing</Heading>
      <p className="description">
        Infrequent thoughts on software <em>&</em> design, along with a running
        list of curated <Link href="/words">words</Link>.
      </p>
      <List entries={entries} collection="writing" />
    </>
  );
}
