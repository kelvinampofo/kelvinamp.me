import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Current state of life.'
};

export default function Now() {
  return (
    <aside className="flex flex-col justify-center px-8 py-16 md:py-32 lg:px-10 lg:py-32">
      <h1 className="mb-6 text-xl font-medium dark:text-white">Now</h1>
      <section>
        <p className="mb-6">
          Diving deep into passions and interests—keeping in mind that{' '}
          <em>
            <q>everything around me is someone&apos;s life work</q>.
          </em>
        </p>
        <p className="mb-6">
          For now, I&apos;m focused on building software of which I&apos;ve
          barely even scratched the surface. Interactivity, typography, design,
          motion, touch, optimisations, accessibility—there is an infinite space
          for creativity and opportunity.
        </p>
        <p className="mb-6">
          Taking the time to be still, embracing a minimalist lifestyle centered
          around purpose and intention with my beatiful wife.
        </p>
        <p className="mb-6">
          Enjoying music that evokes strong emotions. Watching videos of cars I
          aspire to own. Staying up-to-date with latest advancements in
          technology.
        </p>
      </section>
      <section>
        <Link
          href="/"
          className="inline-flex items-center underline decoration-neutral-500 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:hover:text-neutral-400"
          aria-label="Go to home page"
        >
          <ArrowTopLeftIcon className="dark:text-neutral-400" />
          Index
        </Link>
      </section>
    </aside>
  );
}
