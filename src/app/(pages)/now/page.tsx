import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import CustomLink from '@/app/components/ui/CustomLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Personal + pro updates.',
  openGraph: {
    title: 'Now',
    description: 'Personal + pro updates.'
  },
  twitter: {
    title: 'Now',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Personal + pro updates.',
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
      <section className="mb-12 mt-6 flex flex-col gap-6">
        <p>
          Dedicated to enhancing skill through hands-on, immersive exploration in art+technology.
        </p>
        <p>
          For now, I want to design and build software. Interactivity, typography, motion, touch,
          optimisations, accessibility, design&mdash;an infinite canvas for creativity and
          opportunity.
        </p>
        <p>
          Enjoying music that evokes strong emotions, reading{' '}
          <CustomLink href="https://literal.club/kelvinamp">books</CustomLink>, sipping iced tea,
          watching Porsche videos.
        </p>
        <p>Separating identity from trivialities. Finding joy in challenges. Insatiably curious.</p>
      </section>
      <span>
        <CustomLink href="/" ariaLabel="go to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
