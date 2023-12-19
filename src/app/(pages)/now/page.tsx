import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Text from '@/app/components/generic/Text';
import CustomLink from '@/app/components/ui/CustomLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Personal and professional updates.',
  openGraph: {
    title: 'Now',
    description: 'Personal and professional updates.'
  },
  twitter: {
    title: 'Now',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Personal and professional updates.',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        height: 1200,
        width: 1200
      }
    ]
  }
};

export default function Now() {
  return (
    <Container>
      <Heading>Now</Heading>
      <section className="mb-8 mt-6 flex flex-col gap-6">
        <Text>
          Dedicated to enhancing skill through hands-on, immersive exploration in art+technology.
        </Text>
        <Text>
          For now, all I want to do is design and build software. Interactivity, typography, motion,
          touch, optimisations, accessibility, design&mdash;an infinite canvas for creativity and
          opportunity.
        </Text>
        <Text>
          Design and code pursuits aside, probably reading and/or listening to{' '}
          <CustomLink href="https://literal.club/kelvinamp/goals">books</CustomLink>, enjoying
          emotionally evocative music or playing with the Porsche{' '}
          <CustomLink href="https://configurator.porsche.com/porsche-code/PRWFJS71">
            configurator
          </CustomLink>
          .
        </Text>
        <Text>Speaking less, unless I can improve the silence.</Text>
      </section>
      <Text colour="secondary" size="small" className="mb-12">
        Last updated <time dateTime="2023-12-10">December 10, 2023</time>
      </Text>
      <span>
        <CustomLink href="/" ariaLabel="Back to home page" arrowIcon hideUnderline className="p-1">
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
