import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import CopyButton from '@/app/components/ui/CopyButton';
import InlineLink from '@/app/components/ui/InlineLink';
import Navigation from '@/app/components/ui/Navigation/Navigation';
import { allPrototypes } from '@/app/lib/prototypes';
import { findPrototype } from '@/app/utils/search';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import AdaptiveInterface from './AdaptiveInterface';

const adaptiveInterface = findPrototype(allPrototypes, 'Adaptive interface');

const { title, publishedAt, summary, image } = adaptiveInterface;

export const metadata: Metadata = {
  title,
  description: summary,
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title,
    description: summary,
    images: [
      {
        url: image as string,
        height: 1080,
        width: 566,
        alt: summary
      }
    ]
  },
  twitter: {
    title,
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: summary,
    images: [
      {
        url: image as string,
        height: 1080,
        width: 566,
        alt: summary
      }
    ]
  }
};

export default function Page() {
  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <InlineLink href="/craft" arrowIcon hideUnderline>
            Craft
          </InlineLink>
        </span>
        <Heading>{title}</Heading>
      </header>
      <div className="flex items-center justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <div className="flex flex-col gap-2">
        <p className="mt-8">
          An adaptive interface based on usage. Inspired by this{' '}
          <InlineLink href="https://x.com/carmguti/status/1877132625388716124">tweet</InlineLink> on
          game design.
        </p>
      </div>
      <Card className="my-8 flex items-center justify-center gap-12 md:gap-20">
        <AdaptiveInterface />
      </Card>
      <section>
        <p>
          Was chatting with a friend on the use case of such an interface. What if the visual cues
          on the screen that aid in learning keyboard shortcuts vanish after a specific number of
          uses and then reappear when accessed through the GUI? This approach could be of particular
          benefit for learning keyboard shortcuts in any piece of software. In a sense, it could
          serve as a behavior reinforcement technique—keyboard training.
        </p>
      </section>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={adaptiveInterface} route="craft" />
    </Container>
  );
}
