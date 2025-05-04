import Link from "next/link";

import Heading from "../components/heading/Heading";
import List from "../components/list/List";

import { getPosts } from "./utils";
import styles from "./WritingLayout.module.css";

export default async function WritingPage() {
  const posts = await getPosts();

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
