import { Metadata } from 'next';

import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import InlineLink from '@/app/components/ui/InlineLink';
import List from '@/app/components/ui/List';
import { allPosts } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Writing',
  publisher: 'Kelvin Ampofo',
  authors: [{ name: 'Kelvin Ampofo' }],
  description: 'Collection of half-formed thoughts and words.',
  openGraph: {
    title: 'Writing',
    description: 'Collection of half-formed thoughts and words.'
  },
  twitter: {
    title: 'Writing',
    site: '@kelvinamp_',
    creator: '@kelvinamp',
    card: 'summary',
    description: 'Collection of half-formed thoughts and words.',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        height: 1200,
        width: 1200
      }
    ]
  }
};

export default function Writing() {
  return (
    <Container>
      <Heading className="mb-2">Writing</Heading>
      <p className="mb-10 text-secondary dark:text-secondary-dark">
        Collection of half-formed thoughts and <InlineLink href="/words">words</InlineLink>.
      </p>
      <List items={allPosts} route="writing" />
      <InlineLink className="mt-12" href="/" arrowIcon hideUnderline ariaLabel="back to home page">
        Back
      </InlineLink>
    </Container>
  );
}
