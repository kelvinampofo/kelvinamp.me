import Contact from '@/components/Contact';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex flex-col justify-center px-8 py-16 md:py-32 lg:px-10 lg:py-32">
      <h1 className="text-xl font-medium dark:text-white">Kelvin Ampofo</h1>
      <span className="mb-6 dark:text-neutral-400">Software Engineer</span>
      <section>
        <p className="mb-6">
          <em>Crafting interfaces</em> with a focus on design, human-computer
          interaction and architecture. Currently working in Fintech.
        </p>
        <p>
          Developing skill through immersive, hands-on exploration in art and
          technology.
        </p>
      </section>
      <section>
        <Link
          href="/now"
          className="mt-6 inline-flex items-center underline decoration-neutral-500 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:hover:text-neutral-400"
          aria-label="Go to now page"
        >
          Now
          <ArrowTopRightIcon className="mr-1 dark:text-neutral-400" />
        </Link>
      </section>
      <hr className="my-12 h-px border-0 bg-black dark:bg-neutral-800" />
      <Contact />
    </section>
  );
}
