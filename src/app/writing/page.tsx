import Link from "next/link";

import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getEntries } from "../../utils/entries";

export default async function WritingPage() {
  const posts = await getEntries("writing");

  return (
    <>
      <Heading>Writing</Heading>
      <p className="description">
        Infrequent thoughts on software <em>&</em> design, along with some
        appealing <Link href="/words">words</Link>.
      </p>
      <List items={posts} kind="writing" basePath="/writing" />
    </>
  );
}
