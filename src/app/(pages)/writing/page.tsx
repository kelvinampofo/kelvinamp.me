import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CustomLink from '@/app/components/ui/CustomLink';
import List from '@/app/components/ui/List';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  publisher: 'Kelvin Ampofo',
  authors: [{ name: 'Kelvin Ampofo' }],
  description: 'Infrequent thoughts.',
  openGraph: {
    title: 'Writing',
    description: 'Infrequent thoughts.'
  },
  twitter: {
    title: 'Writing',
    site: '@kelvinamp_',
    creator: '@kelvinamp',
    card: 'summary',
    description: 'Infrequent thoughts.',
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
      <Heading className="mb-3">Writing</Heading>
      <Text className="mb-10" colour="secondary">
        Infrequent thoughts on technology, design and things in between.
      </Text>
      <Separator className="mb-3" />
      <List items={allPosts} route="writing" showDate />
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="Back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
