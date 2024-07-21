import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import InlineLink from '@/app/components/ui/InlineLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Personal + professional updates.',
  openGraph: {
    title: 'Now',
    description: 'Personal + professional updates.'
  },
  twitter: {
    title: 'Now',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Personal + professional updates.',
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
      <Heading className="mb-6">Now</Heading>
      <section className="mb-6 flex flex-col gap-6">
        <p>
          Committed to developing skill, through guiltless exploration in software{' '}
          <em className="font-serif">&</em> design.
        </p>
        <p>
          Interactivity, typography, motion, touch, optimisations, accessibility, design&mdash;an
          infinite canvas for creativity and opportunity.
        </p>
        <p>
          Pursuits aside, probably{' '}
          <InlineLink href="https://literal.club/kelvinamp/goals">reading</InlineLink>, enjoying
          emotionally evocative music, or playing with the Porsche{' '}
          <InlineLink href="https://configurator.porsche.com/porsche-code/PSDVI5H9">
            configurator
          </InlineLink>
          .
        </p>
        <p>Speaking less, unless I can improve the silence.</p>
      </section>
      <InlineLink href="/" ariaLabel="back to home page" arrowIcon hideUnderline>
        Back
      </InlineLink>
    </Container>
  );
}
