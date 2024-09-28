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
import ProgressiveBlur from './ProgressiveBlur';

const progressiveBlur = findPrototype(allPrototypes, 'Progressive Blur');
const { title, publishedAt, summary, image } = progressiveBlur;

export const metadata: Metadata = {
  title: title,
  description: summary,
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: title,
    description: summary,
    images: [
      {
        url: image as string,
        height: 1200,
        width: 1200,
        alt: 'progressive blur thumbnail image'
      }
    ]
  },
  twitter: {
    title: title,
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: summary,
    images: [
      {
        url: image as string,
        height: 1200,
        width: 1200,
        alt: 'progressive blur thumbnail image'
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
        <Heading className="text-lg font-medium">{title}</Heading>
      </header>
      <div className="flex items-center justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <p className="mt-8 leading-[1.375rem]">
        Progressive blur effect using{' '}
        <code className="rounded-[4px] border border-neutral-200 bg-neutral-100 px-1 py-0.5 text-[0.8125rem] text-neutral-800 dark:border-neutral-800 dark:bg-[#1c1c1c] dark:text-primary-dark">
          mask-image
        </code>
        .
      </p>
      <Card className="mt-8 flex h-48 items-center justify-center gap-12 md:gap-20">
        <ProgressiveBlur />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={progressiveBlur} route="craft" />
    </Container>
  );
}
