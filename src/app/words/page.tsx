import clsx from "clsx";

import BackButton from "../../components/back-button/BackButton";
import Heading from "../../components/heading/Heading";
import Separator from "../../components/separator/Separator";

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
    word: "insatiable",
    type: "adjective",
    definition: "(of an appetite or desire) impossible to satisfy",
  },
  {
    word: "Devoid",
    type: "adjective",
    definition: "entirely lacking or free from",
  },
  {
    word: "titbit",
    type: "noun",
    definition:
      "a small and particularly interesting item of gossip or information",
  },
  {
    word: "grok",
    type: "verb",
    definition: "understand (something) intuitively or by empathy",
    variations: ["groks", "grokking", "grokked"],
  },
  {
    word: "peculiar",
    type: "adjective",
    definition: "different to what is normal or expected; strange:",
  },
  {
    word: "erroneous",
    type: "adjective",
    definition: "wrong; incorrect",
  },
  {
    word: "anomalous",
    type: "adjective",
    definition: "deviating from what is standard, normal, or expected",
  },
  {
    word: "trawling",
    type: "noun",
    definition: "the activity of searching or sifting through something",
  },
];

export default function Words() {
  return (
    <>
      <nav className="layout-rail">
        <BackButton href="/writing" />
      </nav>

      <article className={clsx("prose", "layout-main")}>
        <Heading>Words</Heading>
        <p className="description">Curated collection of appealing language.</p>
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
