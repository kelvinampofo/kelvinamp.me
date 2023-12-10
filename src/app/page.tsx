'use client';

import AnimateEnter from '@/app/components/generic/AnimateEnter';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import Contact from '@/app/components/ui/Contact';
import CustomLink from '@/app/components/ui/CustomLink';
import Tooltip from '@/app/components/ui/Tooltip';
import useTime from '@/app/hooks/useTime';

export default function Home() {
  const { currentTime, timezoneOffset } = useTime();

  return (
    <Container>
      <AnimateEnter delay={0.4}>
        <header>
          <Heading>Kelvin Ampofo</Heading>
          <Text as="span" colour="secondary">
            Software Engineer
          </Text>
        </header>
      </AnimateEnter>
      <AnimateEnter delay={0.6}>
        <section className="my-6 flex flex-col gap-6">
          <p>
            <em>Crafting interfaces</em> with a focus on design, human-computer interaction and
            architecture. Currently working in digital banking.
          </p>
          <p>
            Read further on <CustomLink href="/now">now</CustomLink> page.
          </p>
        </section>
        <nav className="flex flex-col gap-1">
          <span>
            <CustomLink href="/craft" ariaLabel="Craft page">
              Craft
            </CustomLink>
          </span>
          <span>
            <CustomLink href="/writing" ariaLabel="Writing page">
              Writing
            </CustomLink>
          </span>
        </nav>
        <Separator className="my-12" />
      </AnimateEnter>
      <AnimateEnter delay={0.8}>
        <Contact />
      </AnimateEnter>
      <AnimateEnter delay={1}>
        <Tooltip content={timezoneOffset} className="mt-24">
          <span
            className="inline-block cursor-crosshair font-mono text-xs text-secondary dark:text-secondary-dark"
            aria-live="off"
            role="status"
          >
            {currentTime}
          </span>
        </Tooltip>
      </AnimateEnter>
    </Container>
  );
}
