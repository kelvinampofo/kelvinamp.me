import Contact from '@/components/Contact';
import Container from '@/components/Container';
import CustomLink from '@/components/CustomLink';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <Container>
      <PageWrapper delay={0.4}>
        <h1 className="text-lg font-medium">Kelvin Ampofo</h1>
        <span className="text-[#6F6F6F] dark:text-neutral-400">
          Software Engineer
        </span>
      </PageWrapper>
      <PageWrapper delay={0.6}>
        <section className="my-6 flex flex-col gap-6">
          <p>
            <em>Crafting interfaces</em> with a focus on design, human-computer
            interaction and architecture. Currently working in digital banking.
          </p>
          <p>
            Developing skill through immersive, hands-on exploration in art and
            technology.
          </p>
        </section>
        <span className="flex gap-3">
          <span>
            <CustomLink href="/now" ariaLabel="go to now page">
              Now
            </CustomLink>
          </span>
          <span>
            <CustomLink href="/thoughts" ariaLabel="go to thoughts page">
              Thoughts
            </CustomLink>
          </span>
        </span>
        <hr className="my-12 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      </PageWrapper>
      <PageWrapper delay={0.8}>
        <Contact />
      </PageWrapper>
    </Container>
  );
}
