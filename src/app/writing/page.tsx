import Link from "next/link";

import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getContentEntries } from "../../utils/content-collection";

export default async function WritingPage() {
  const entries = await getContentEntries("writing");

  return (
    <>
      <Heading>Writing</Heading>
      <p className="description">
        Infrequent thoughts on software <em>&</em> design, along with some
        appealing <Link href="/words">words</Link>.
      </p>
      <List entries={entries} collection="writing" />
    </>
  );
}
