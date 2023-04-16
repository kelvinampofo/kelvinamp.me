import Container from '@/components/Container';
import PageWrapper from '@/components/PageWrapper';
import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Current state of life.'
};

export default function Now() {
  return (
    <PageWrapper>
      <Container>
        <h1 className="text-xl font-medium">Now</h1>
        <section className="my-6 flex flex-col gap-6">
          <p>
            Diving deep into passions and interests&mdash;keeping in mind that{' '}
            <em>
              <q>everything around me is someone&apos;s life work</q>.
            </em>
          </p>
          <p>
            For now, my main focus is to build software of which I&apos;ve only
            just scratched the surface. Interactivity, typography, design,
            motion, touch, optimisations, accessibility&mdash;there is an
            infinite space for creativity and opportunity.
          </p>
          <p>
            Taking the time to be still, embracing a <s>minimal</s> simple
            lifestyle centred around purpose and intention.
          </p>
          <p>
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
              className="mr-[3px] text-neutral-400"
              aria-label="ArrowTopLeft icon"
              width={18}
              height={18}
            />
            Index
          </Link>
        </span>
      </Container>
    </PageWrapper>
  );
}
