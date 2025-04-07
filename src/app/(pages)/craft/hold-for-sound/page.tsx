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

import HoldForSound from './HoldForSound';

const holdForSound = findPrototype(allPrototypes, 'Hold for sound');
const { title, publishedAt, summary, image } = holdForSound;

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
      <p className="mt-8">{summary}</p>
      <Card className="mt-8 flex items-center justify-center gap-12 md:gap-20">
        <HoldForSound />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={holdForSound} route="craft" />
    </Container>
  );
}
