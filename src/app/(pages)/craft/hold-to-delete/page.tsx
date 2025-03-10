import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';

import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import CopyButton from '@/app/components/ui/CopyButton';
import InlineLink from '@/app/components/ui/InlineLink';
import Navigation from '@/app/components/ui/Navigation/Navigation';
import { allPrototypes } from '@/app/lib/prototypes';
import { findPrototype } from '@/app/utils/search';

import HoldToDelete from './HoldToDelete';

const holdToDelete = findPrototype(allPrototypes, 'Hold to delete');
const { title, publishedAt, summary, image } = holdToDelete;

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
          Uses{' '}
          <code className="rounded-[4px] border border-neutral-200 bg-neutral-100 px-1 py-0.5 text-[0.8125rem] text-neutral-800 dark:border-neutral-800 dark:bg-[#1c1c1c] dark:text-primary-dark">
            clip-path
          </code>{' '}
          to animate the progress&mdash;leveraging{' '}
          <InlineLink href="https://en.wikipedia.org/wiki/Hardware_acceleration">
            hardware acceleration
          </InlineLink>{' '}
          for a more more performant interaction.
        </p>
        <p>
          Inspired by{' '}
          <InlineLink href="https://www.reddit.com/r/web_design/comments/247nb2/hold_to_delete_pingdoms_clever_alternative_to_the/?rdt=41624">
            Pingdom&apos;s
          </InlineLink>{' '}
          implementation, this offers a better alternative to confirmation modals and dialogs.
        </p>
      </div>
      <Card className="mt-8 flex items-center justify-center gap-12 md:gap-20">
        <HoldToDelete />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={holdToDelete} route="craft" />
    </Container>
  );
}
