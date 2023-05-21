import Container from '@/components/Container';
import CustomLink from '@/components/CustomLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Current rhythm of life.',
  openGraph: {
    title: 'Now',
    description: 'Current rhythm of life.'
  },
  twitter: {
    title: 'Now',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Current rhythm of life.',
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
      <h1 className="text-lg font-medium">Now</h1>
      <section className="my-6 flex flex-col gap-6">
        <p>
          Developing skill through immersive, hands-on exploration in art and
          technology&mdash;keeping in mind that{' '}
          <em>
            <q>everything around me is someone&apos;s life work</q>.
          </em>
        </p>
        <p>
          Dedicated to building software. Interactivity, typography, motion,
          touch, optimisations, accessibility and design&mdash;there&apos;s an
          infinite canvas for creativity and opportunity.
        </p>
        <p>
          Seperating identify from trivialities. Reading excessively, thinking
          critically. Finding joy in challenges. Meticulous about the details.
        </p>
        <p>
          Enjoying music that evokes strong emotions. Watching Porsche videos.
          Drinking iced tea.
        </p>
        <p>
          View current selection of reading on{' '}
          <CustomLink href="https://literal.club/kelvinamp" underline>
            Literal
          </CustomLink>
        </p>
      </section>
      <span>
        <CustomLink href="/" ariaLabel="go to home page" arrowIcon>
          Index
        </CustomLink>
      </span>
    </Container>
  );
}
