import { Metadata } from 'next';

import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';

export const metadata: Metadata = {
  title: 'Words',
  description: 'Curated collection of appealing language.',
  openGraph: {
    title: 'Words',
    description: 'Curated collection of appealing language.'
  },
  twitter: {
    title: 'Words',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Curated collection of appealing language.',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        height: 1200,
        width: 1200
      }
    ]
  }
};

export default function Words() {
  return (
    <Container>
      <Heading className="mb-3">Words</Heading>
      <p className="mb-10 text-secondary dark:text-secondary-dark">
        Curated collection of appealing language.
      </p>

      <Separator className="mb-12" />

      <dl className="mb-12 grid grid-cols-1 gap-x-24 gap-y-12 sm:grid-cols-2">
        <WordEntry
          word="elusive"
          type="adjective"
          definition="difficult to find, catch, or achieve"
        />
        <WordEntry
          word="meticulous"
          type="adjective"
          definition="showing great attention to detail; very careful and precise"
        />
        <WordEntry word="ephemeral" type="adjective" definition="lasting for a very short time" />
        <WordEntry
          word="luminous"
          type="adjective"
          definition="giving off light; bright or shining"
        />
        <WordEntry
          word="serendipity"
          type="noun"
          definition="the occurrence of events by chance in a happy or beneficial way"
        />
        <WordEntry
          word="grok"
          type="verb"
          definition="understand (something) intuitively or by empathy"
          variations="groks, grokking, grokked"
        />
        <WordEntry
          word="insatiable"
          type="adjective"
          definition="(of an appetite or desire) impossible to satisfy"
        />
      </dl>
    </Container>
  );
}

function WordEntry({
  word,
  type,
  definition,
  variations
}: {
  word: string;
  type: 'noun' | 'verb' | 'adjective' | 'adverb';
  definition: string;
  variations?: string;
}) {
  return (
    <div className="space-y-3">
      <dt className="font-medium text-primary dark:text-primary-dark">{word}</dt>
      <div className="space-y-3">
        <dd className="font-italic text-secondary dark:text-secondary-dark">
          {type} {variations && <span className="font-medium">({variations})</span>}
        </dd>
        <dd className="text-secondary dark:text-secondary-dark">{definition}</dd>
      </div>
    </div>
  );
}
