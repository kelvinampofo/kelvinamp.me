import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import CustomLink from '@/app/components/ui/CustomLink';
import List from '@/app/components/ui/List';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  publisher: 'Kelvin Ampofo',
  authors: [{ name: 'Kelvin Ampofo' }],
  description: 'Infrequent written thoughts.',
  openGraph: {
    title: 'Writing',
    description: 'Infrequent written thoughts.'
  },
  twitter: {
    title: 'Writing',
    site: '@kelvinamp_',
    creator: '@kelvinamp',
    card: 'summary',
    description: 'Infrequent written thoughts.',
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
      <p className="mb-10 text-[#6F6F6F] dark:text-neutral-400">
        Infrequent written thoughts on technology, design and things in between.
      </p>
      <Separator className="mb-3" />
      <List items={allPosts} route="writing" />
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
