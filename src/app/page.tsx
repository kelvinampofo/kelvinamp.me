import Contact from '@/components/Contact';
import Container from '@/components/Container';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <PageWrapper delay={0.2}>
        <h1 className="text-xl font-medium">Kelvin Ampofo</h1>
        <span className="text-neutral-500 dark:text-neutral-400">
          Software Engineer
        </span>
      </PageWrapper>
      <PageWrapper delay={0.4}>
        <section className="my-6 flex flex-col gap-6">
          <p>
            <em>Crafting interfaces</em> with a focus on design, human-computer
            interaction and architecture. Currently working in Fintech.
          </p>
          <p>
            Developing skill through immersive, hands-on exploration in art and
            technology.
          </p>
        </section>
        <span>
          <Link
            href="/now"
            className="inline-flex items-center underline decoration-neutral-400 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:decoration-neutral-500 dark:hover:text-neutral-400"
            aria-label="Go to now page"
          >
            Now
          </Link>
        </span>
        <hr className="my-12 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      </PageWrapper>
      <PageWrapper delay={0.6}>
        <Contact />
      </PageWrapper>
    </Container>
  );
}
