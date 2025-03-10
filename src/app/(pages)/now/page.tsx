import { Metadata } from 'next';

import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import InlineLink from '@/app/components/ui/InlineLink';

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
          Interactivity, typography, writing, motion, touch, optimisations, accessibility, branding,
          layout&mdash;an infinite canvas for creativity and opportunity.
        </p>
        <p>
          Pursuits aside, probably{' '}
          <InlineLink href="https://literal.club/kelvinamp">reading</InlineLink>,{' '}
          <InlineLink href="https://music.apple.com/gb/album/the-miseducation-of-lauryn-hill/1276760743">
            listening
          </InlineLink>
          ,{' '}
          <InlineLink href="https://youtube.com/playlist?list=PL_xPJT_mBnFm9mYbzx3Ed61o1ZD3w17n9&si=jVu1IodbNsjB8LOx">
            watching
          </InlineLink>
          , or playing with the Porsche{' '}
          <InlineLink href="https://configurator.porsche.com/porsche-code/PSR3WDD9">
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
