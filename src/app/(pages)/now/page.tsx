import Container from '@/app/components/generic/Container';
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
      <h1 className="text-lg font-medium">Now</h1>
      <section className="mb-12 mt-6 flex flex-col gap-6">
        <p>
          Dedicated to creative excellence through immersive, hands-on exploration in art and
          technology&mdash;keeping in mind that{' '}
          <em>
            <q>everything around me is someone&apos;s life work</q>.
          </em>
        </p>
        <p>
          For now, I <s>just</s> want to design and build software. Interactivity, typography,
          motion, touch, optimisations, accessibility, design&mdash;an infinite canvas for
          creativity and opportunity.
        </p>
        <p>
          Separating identify from trivialities. Practising inward focus. Reading excessively,
          thinking critically. Finding joy in challenges. Meticulous about the details. Insatiably
          curious.
        </p>
        <p>
          Enjoying music that evokes strong emotions. Watching Porsche videos. Drinking iced tea.
        </p>
        <p>
          View current selection of reading on{' '}
          <CustomLink href="https://literal.club/kelvinamp" underline>
            Literal
          </CustomLink>
          .
        </p>
      </section>
      <span>
        <CustomLink href="/" ariaLabel="go to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
