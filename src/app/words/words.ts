interface WordEntryProps {
  word: string;
  type: "noun" | "verb" | "adjective" | "adverb";
  definition: string;
  variations?: string[];
}

export const wordEntries: WordEntryProps[] = [
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
    word: "devoid",
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
  {
    word: "resumption",
    type: "noun",
    definition:
      "the action of beginning something again after a pause or interruption",
  },
  {
    word: "grandiose",
    type: "adjective",
    definition:
      "impressive or magnificent in appearance or style, especially pretentiously so",
  },
  {
    word: "tangentially",
    type: "adverb",
    definition: "in a way that relates only slightly to a matter; peripherally",
  },
  {
    word: "cyclical",
    type: "adjective",
    definition: "occurring in cycles; recurrent",
  },
  {
    word: "orthogonal",
    type: "adjective",
    definition: "of or involving right angles; at right angles",
  },
  {
    word: "thematic",
    type: "adjective",
    definition: "having or relating to subjects or a particular subject",
  },
  {
    word: "schematic",
    type: "adjective",
    definition: "of or in the form of a diagram; symbolic and simplified",
  },
  {
    word: "salient",
    type: "adjective",
    definition: "most noticeable or important",
  },
  {
    word: "myopic",
    type: "adjective",
    definition: "short-sighted; lacking foresight, or intellectual insight",
  },
  {
    word: "cognoscente",
    type: "noun",
    definition: "a connoisseur; a discerning expert",
  },
  {
    word: "pictorial",
    type: "adjective",
    definition: "of or expressed in pictures; illustrated",
  },
  {
    word: "horology",
    type: "noun",
    definition:
      "the study and measurement of time and the art of making clocks and watches",
  },
];
