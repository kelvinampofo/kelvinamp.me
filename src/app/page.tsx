import Contact from '@/components/Contact';
import Container from '@/components/Container';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <h1 className="text-xl font-medium dark:text-white">Kelvin Ampofo</h1>
      <span className="mb-6 text-neutral-500 dark:text-neutral-400">
        Software Engineer
      </span>
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
          className="mt-6 inline-flex items-center underline decoration-neutral-300 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:decoration-neutral-500 dark:hover:text-neutral-400"
          aria-label="Go to now page"
        >
          Now
          <ArrowTopRightIcon
            className="ml-1 text-neutral-500 dark:text-neutral-400"
            aria-label="Top right arrow icon"
          />
        </Link>
      </section>
      <hr className="my-12 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      <Contact />
    </Container>
  );
}
