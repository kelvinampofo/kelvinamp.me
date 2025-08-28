import Link from "next/link";

import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getEntries } from "../../lib/utils";
import styles from "../../styles/layout.module.css";

export default async function WritingPage() {
  const posts = await getEntries("writing");

  return (
    <>
      <Heading>Writing</Heading>
      <p className={styles.description}>
        Infrequent thoughts on software <em>&</em> design, along with some
        appealing <Link href="/words">words</Link>.
      </p>
      <List items={posts} basePath="/writing" />
    </>
  );
}
