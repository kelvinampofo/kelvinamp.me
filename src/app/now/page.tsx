import Container from '@/components/Container';
import ExternalLink from '@/components/ExternalLink';
import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Current state of life.'
};

export default function Now() {
  return (
    <Container>
      <h1 className="mb-6 text-xl font-medium dark:text-white">Now</h1>
      <section>
        <p className="mb-6">
          Diving deep into passions and interests&mdash;keeping in mind that{' '}
          <em>
            <q>everything around me is someone&apos;s life work</q>.
          </em>
        </p>
        <p className="mb-6">
          For now, my main focus is to{' '}
          <ExternalLink href="https://www.audible.co.uk/pd/Build-Audiobook/B09MSBVCYL">
            build
          </ExternalLink>{' '}
          software of which I&apos;ve only just scratched the surface.
          Interactivity, typography, design, motion, touch, optimisations,
          accessibility&mdash;there is an infinite space for creativity and
          opportunity.
        </p>
        <p className="mb-6">
          Taking the time to be still, embracing a <s>minimal</s> simple
          lifestyle centered around purpose and intention.
        </p>
        <p className="mb-6">
          Enjoying music that evokes strong emotions. Watching videos of super
          cars. Keeping up with the latest advancements in technology.
        </p>
      </section>
      <span>
        <Link
          href="/"
          className="inline-flex items-center underline decoration-neutral-300 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:decoration-neutral-500 dark:hover:text-neutral-400"
          aria-label="Go to home page"
        >
          <ArrowTopLeftIcon
            className="mr-1 text-neutral-500 dark:text-neutral-400"
            aria-label="Top left arrow icon"
          />
          Index
        </Link>
      </span>
    </Container>
  );
}
