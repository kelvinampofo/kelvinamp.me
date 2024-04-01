import AnimateEnter from '@/app/components/generic/AnimateEnter';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import Contact from '@/app/components/ui/Contact';
import InternalLink from '@/app/components/ui/InlineLink';
import TimeWidget from '@/app/components/ui/TimeWidget';
import { pages } from './constants/constants';

export default function Home() {
  return (
    <Container>
      <AnimateEnter delay={0.4}>
        <header>
          <Heading>Kelvin Ampofo</Heading>
          <Text colour="secondary">Design Engineer</Text>
        </header>
      </AnimateEnter>
      <AnimateEnter delay={0.6}>
        <section className="my-6 space-y-6">
          <p>
            Crafting software with strong focus on design, human-computer interaction and
            architecture. Insatiably curious about novel interfaces. Currently working in digital
            banking.
          </p>
          <p>
            Read further on{' '}
            <InternalLink href="/now" ariaLabel="now page">
              now
            </InternalLink>{' '}
            page.
          </p>
        </section>
      </AnimateEnter>
      <AnimateEnter delay={0.8}>
        <nav className="space-x-2">
          {pages.map(({ name, href, ariaLabel }) => (
            <span key={name}>
              <InternalLink href={href} ariaLabel={ariaLabel}>
                {name}
              </InternalLink>
            </span>
          ))}
        </nav>
        <Separator className="my-12" />
      </AnimateEnter>
      <AnimateEnter delay={1}>
        <Contact />
      </AnimateEnter>
      <AnimateEnter delay={1.2}>
        <TimeWidget />
      </AnimateEnter>
    </Container>
  );
}
