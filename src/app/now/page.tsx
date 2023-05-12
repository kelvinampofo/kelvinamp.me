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
          For now, my main focus is to build software of which I&apos;ve only
          just scratched the surface. Interactivity, typography, design, motion,
          touch, optimisations, accessibility&mdash;there is an infinite space
          for creativity and opportunity.
        </p>
        <p>
          Taking the time to be still, embracing a <s>minimal</s> simple
          lifestyle centred around intention. Making space for the
          essentials&mdash;health, family, people, creation and iced tea.
        </p>
        <p>
          Enjoying music that evokes strong emotions. Watching videos of super
          cars. Keeping up with the latest advancements in technology.
        </p>
        <p>
          See library of current reading on{' '}
          <CustomLink href="https://literal.club/kelvinamp" underline>
            Literal
          </CustomLink>
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
