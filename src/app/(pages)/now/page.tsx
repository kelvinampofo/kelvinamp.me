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
      <Heading>Now</Heading>
      <section className="my-6 space-y-6">
        <p>Committed to developing skill, through guiltless exploration in software and design.</p>
        <p>
          Interactivity, typography, motion, touch, optimisations, accessibility, design&mdash;an
          infinite canvas for creativity and opportunity.
        </p>
        <p>
          Design <em className="font-serif">&</em> code pursuits aside, probably chasing the tail of
          my reading <InlineLink href="https://literal.club/kelvinamp/goals">list</InlineLink>,
          enjoying emotionally evocative music, or playing with the Porsche{' '}
          <InlineLink href="https://configurator.porsche.com/porsche-code/PRIZFKE8">
            configurator
          </InlineLink>
          .
        </p>
        <p>Speaking less, unless I can improve the silence.</p>
      </section>
      <span>
        <InlineLink href="/" ariaLabel="back to home page" arrowIcon hideUnderline>
          Back
        </InlineLink>
      </span>
    </Container>
  );
}
