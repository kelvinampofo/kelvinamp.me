"use client";

import clsx from "clsx";

import Heading from "../components/heading/Heading";
import styles from "../styles/layout.module.css";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <article className={clsx("basic-prose", styles.pageLayout)}>
      <Heading>{error.name}</Heading>
      <p>{error.message}</p>
      <pre className={styles.errorStack}>{error.stack}</pre>
    </article>
  );
}
