import clsx from "clsx";

import BackButton from "../components/back-button/BackButton";
import Heading from "../components/heading/Heading";
import Separator from "../components/separator/Separator";
import layoutStyles from "../styles/layout.module.css";

import styles from "./Words.module.css";

interface WordEntryProps {
  word: string;
  type: "noun" | "verb" | "adjective" | "adverb";
  definition: string;
  variations?: string[];
}

const wordEntries: WordEntryProps[] = [
  {
    word: "elusive",
    type: "adjective",
    definition: "difficult to find, catch, or achieve",
  },
  {
    word: "meticulous",
    type: "adjective",
    definition: "showing great attention to detail; very careful and precise",
  },
  {
    word: "ephemeral",
    type: "adjective",
    definition: "lasting for a very short time",
  },
  {
    word: "luminous",
    type: "adjective",
    definition: "giving off light; bright or shining",
  },
  {
    word: "serendipity",
    type: "noun",
    definition:
      "the occurrence of events by chance in a happy or beneficial way",
  },
  {
    word: "grok",
    type: "verb",
    definition: "understand (something) intuitively or by empathy",
    variations: ["groks", "grokking", "grokked"],
  },
  {
    word: "insatiable",
    type: "adjective",
    definition: "(of an appetite or desire) impossible to satisfy",
  },
  {
    word: "titbit",
    type: "noun",
    definition:
      "a small and particularly interesting item of gossip or information",
  },
];

export default function Words() {
  return (
    <>
      <nav className={layoutStyles.navWrapper}>
        <BackButton href="/writing" />
      </nav>

      <article className={clsx("basic-prose", layoutStyles.writingLayout)}>
        <Heading>Words</Heading>
        <p className={layoutStyles.description}>
          Curated collection of appealing language.
        </p>

        <Separator className={styles.wordsSeparator} />

        <dl className={styles.wordsList}>
          {wordEntries.map(({ word, type, definition, variations }) => (
            <WordEntry
              key={word}
              word={word}
              type={type}
              definition={definition}
              variations={variations}
            />
          ))}
        </dl>
      </article>
    </>
  );
}

function WordEntry({ word, type, definition, variations }: WordEntryProps) {
  return (
    <div className={styles.wordEntry}>
      <dt className={styles.word}>{word}</dt>
      <dd className={styles.wordType}>
        <i>
          {type}
          {variations && ` (${variations.join(", ")})`}
        </i>
      </dd>
      <dd className={styles.wordDefinition}>{definition}</dd>
    </div>
  );
}
