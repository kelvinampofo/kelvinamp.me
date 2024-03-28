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
      <section className="my-6 space-y-6">
        <p>
          Devoted to enhancing craft, through guilt-free, hands-on exploration in software and
          design.
        </p>
        <p>
          Interactivity, typography, motion, touch, optimisations, accessibility, design&mdash;an
          infinite canvas for creativity and opportunity.
        </p>
        <p>
          Design <em className="font-serif">&</em> code pursuits aside, probably chasing the tail of
          my reading <CustomLink href="https://literal.club/kelvinamp/goals">list</CustomLink>,
          enjoying emotionally evocative music, embracing entropy or playing with the Porsche{' '}
          <CustomLink href="https://configurator.porsche.com/porsche-code/PRIZFKE8">
            configurator
          </CustomLink>
          .
        </p>
        <p>Speaking less, unless I can improve the silence.</p>
      </section>
      <span>
        <CustomLink href="/" ariaLabel="back to home page" arrowIcon hideUnderline className="p-1">
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
