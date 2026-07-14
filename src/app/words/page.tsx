import clsx from "clsx";
import type { Metadata } from "next";

import BackButton from "../../components/back-button/BackButton";
import Heading from "../../components/heading/Heading";
import Separator from "../../components/separator/Separator";

import { wordEntries } from "./words";
import styles from "./Words.module.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/words",
  },
  title: "Words",
  description: "A running list of curated words.",
};

export default function Words() {
  return (
    <>
      <nav className="layout-rail">
        <BackButton href="/writing" />
      </nav>

      <article className={clsx("prose", "layout-main")}>
        <Heading>Words</Heading>
        <p className="description">Running list of curated words.</p>
        <Separator className={styles.separator} />
        <dl className={styles.list}>
          {wordEntries.map(({ word, type, definition, variations }) => (
            <div className={styles.entry} key={word}>
              <dt className={styles.term}>{word}</dt>
              <dd className={styles.partOfSpeech}>
                <i>
                  {type}
                  {variations && ` (${variations.join(", ")})`}
                </i>
              </dd>
              <dd className={styles.definition}>{definition}</dd>
            </div>
          ))}
        </dl>
      </article>
    </>
  );
}
