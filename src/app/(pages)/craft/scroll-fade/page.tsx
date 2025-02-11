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
import ScrollFadeTabs from './ScrollFadeTabs';

const scrollFade = findPrototype(allPrototypes, 'Scroll fade');

const { title, publishedAt, summary, image } = scrollFade;

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

const tabs = [
  { label: 'Technology', value: 'technology' },
  { label: 'Business', value: 'business' },
  { label: 'Health', value: 'health' },
  { label: 'Science', value: 'science' },
  { label: 'Sports', value: 'sports' },
  { label: 'Entertainment', value: 'entertainment' }
];

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
        <p className="mt-8">{summary}</p>
      </div>
      <Card className="my-8 flex h-48 items-center justify-center">
        <div className="w-5/6 md:w-3/5">
          <ScrollFadeTabs tabs={tabs} />
        </div>
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={scrollFade} route="craft" />
    </Container>
  );
}
