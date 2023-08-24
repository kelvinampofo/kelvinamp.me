import Contact from '@/app/components/generic/Contact';
import Container from '@/app/components/generic/Container';
import PageWrapper from '@/app/components/generic/PageWrapper';
import CustomLink from '@/app/components/ui/CustomLink';
import Separator from './components/generic/Separator';

export default function Home() {
  return (
    <Container>
      <PageWrapper delay={0.4}>
        <header>
          <h1 className="text-lg font-medium">Kelvin Ampofo</h1>
          <span className="text-[#6F6F6F] dark:text-neutral-400">Software Engineer</span>
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
            <CustomLink href="/now" ariaLabel="go to now page" underline>
              now
            </CustomLink>{' '}
            page.
          </p>
        </section>
        <nav className="flex flex-col gap-1">
          <ul>
            <li>
              <CustomLink href="/craft" ariaLabel="go to craft page" underline>
                Craft
              </CustomLink>
            </li>
            <li>
              <CustomLink href="/writing" ariaLabel="go to writing page" underline>
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
