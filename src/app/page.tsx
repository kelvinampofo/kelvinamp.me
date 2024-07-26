import AnimateEnter from '@/app/components/generic/AnimateEnter';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Contact from '@/app/components/ui/Contact';
import InlineLink from '@/app/components/ui/InlineLink';
import TimeWidget from '@/app/components/ui/TimeWidget';

export default function Home() {
  return (
    <Container>
      <AnimateEnter delay={0.3}>
        <Heading className="mb-6">Kelvin Ampofo</Heading>
      </AnimateEnter>
      <AnimateEnter delay={0.4}>
        <section className="mb-6 flex flex-col gap-6">
          <p>
            Crafting software with a focus on design, human-computer interaction, and architecture.
            Insatiable curiosity for novel interfaces. Engineer at NatWest.
          </p>
          <p>
            Read further on{' '}
            <InlineLink href="/now" ariaLabel="now page">
              now
            </InlineLink>{' '}
            page.
          </p>
        </section>
      </AnimateEnter>
      <AnimateEnter delay={0.5}>
        <nav className="flex gap-2">
          <InlineLink href="/craft" ariaLabel="craft page">
            Craft
          </InlineLink>
          <InlineLink href="/writing" ariaLabel="writing page">
            Writing
          </InlineLink>
        </nav>
        <Separator className="my-12" />
      </AnimateEnter>
      <AnimateEnter delay={0.6}>
        <Contact />
      </AnimateEnter>
      <AnimateEnter delay={0.7}>
        <TimeWidget />
      </AnimateEnter>
    </Container>
  );
}
