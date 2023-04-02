import ExternalLink from '@/components/ExternalLink';
import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Now',
  description: 'Current interests, goals and state of life.'
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
          For now, all I want to do is build software (interfaces) of which
          I&apos;ve barely even scratched the surface. Interactivity,
          typography, motion, touch, optimisations, accessibility, design—there
          is an infinite space for creativity and opportunity. Currently
          interested in TypesScript and React.
        </p>
        <p className="mb-6">
          Taking the time to be still, embracing a minimalist lifestyle centered
          around purpose and intention together with my beatiful wife.
        </p>
        <p className="mb-6">
          Enjoying music that evokes strong emotions. Watching videos of cars I
          aspire to own. Staying up-to-date with the latest advancements in
          technological innovation.
        </p>
        <p className="mb-6">
          Inspired by{' '}
          <ExternalLink href="https://nownownow.com/about">
            nownownow.com
          </ExternalLink>
        </p>
      </section>
      <section>
        <Link
          href="/"
          className="inline-flex items-center underline decoration-neutral-500 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-gray-500"
          aria-label="Go to home page"
        >
          <ArrowTopLeftIcon aria-label="Arrow icon" />
          Index
        </Link>
      </section>
    </aside>
  );
}
