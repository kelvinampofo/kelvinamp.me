import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import CustomLink from '@/app/components/ui/CustomLink';
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
      <section className="mb-8 mt-6 flex flex-col gap-6">
        <p>
          Dedicating time to enhancing craft, defining my work somewhere between engineer & designer{' '}
          <span className="blur-content">
            through guilt-free, hands-on exploration in software + design.
          </span>
        </p>
        <p>
          Right now, all I want to do is design and build software. Interactivity, typography,
          touch, motion, design, optimisations, accessibility, audio
          <span className="blur-content">
            &mdash;an infinite canvas for creativity + opportunity.
          </span>
        </p>
        <p>
          Code + design pursuits aside, probably reading and/or listening to{' '}
          <CustomLink href="https://literal.club/kelvinamp/goals">books</CustomLink>, enjoying
          emotionally evocative music, tinkering with electronics or playing with the Porsche{' '}
          <CustomLink href="https://configurator.porsche.com/porsche-code/PRHVZ6J7">
            configurator
          </CustomLink>
          .
        </p>
        <p className="blur-content">Speaking less, unless I can improve the silence.</p>
      </section>
      <span>
        <CustomLink href="/" ariaLabel="Back to home page" arrowIcon hideUnderline className="p-1">
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
