import Contact from '@/app/_components/Contact';
import Container from '@/app/_components/Container';
import CustomLink from '@/app/_components/CustomLink';
import PageWrapper from '@/app/_components/PageWrapper';

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
            Read further on{' '}
            <CustomLink href="/now" underline ariaLabel="go to writing page">
              now
            </CustomLink>{' '}
            page
          </p>
        </section>
        <CustomLink href="/writing" ariaLabel="go to thoughts page">
          / Writing
        </CustomLink>
        <hr className="my-12 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      </PageWrapper>
      <PageWrapper delay={0.8}>
        <Contact />
      </PageWrapper>
    </Container>
  );
}
