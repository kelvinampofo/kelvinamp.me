import PageWrapper from '@/app/components/generic/AnimateEnter';
import Contact from '@/app/components/generic/Contact';
import Container from '@/app/components/generic/Container';
import CustomLink from '@/app/components/ui/CustomLink';
import Heading from './components/generic/Heading';
import Separator from './components/generic/Separator';

export default function Home() {
  return (
    <Container>
      <PageWrapper delay={0.4}>
        <header>
          <Heading>Kelvin Ampofo</Heading>
          <p className="text-[#6F6F6F] dark:text-neutral-400">Software Engineer</p>
        </header>
      </PageWrapper>
      <PageWrapper delay={0.6}>
        <section className="my-6 flex flex-col gap-6">
          <p>
            <em>Crafting interfaces</em> with a focus on design, human-computer interaction and
            architecture. Currently working in digital banking.
          </p>
          <p>
            Read further on{' '}
            <CustomLink href="/now" ariaLabel="go to now page">
              now
            </CustomLink>{' '}
            page.
          </p>
        </section>
        <nav>
          <ul className="flex flex-col gap-1">
            <li>
              <CustomLink href="/craft" ariaLabel="go to craft page">
                Craft
              </CustomLink>
            </li>
            <li>
              <CustomLink href="/writing" ariaLabel="go to writing page">
                Writing
              </CustomLink>
            </li>
          </ul>
        </nav>
        <Separator className="my-12" />
      </PageWrapper>
      <PageWrapper delay={0.8}>
        <Contact />
      </PageWrapper>
    </Container>
  );
}
