import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CopyButton from '@/app/components/ui/CopyButton';
import InlineLink from '@/app/components/ui/InlineLink';
import Navigation from '@/app/components/ui/Navigation/Navigation';
import { allPrototypes } from '@/app/lib/prototypes';
import { findPrototype } from '@/app/lib/utils';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import StickyTabs from './StickyTabs';

export const metadata: Metadata = {
  title: 'Sticky tabs',
  description: 'Sticky tabs inspired by Vercel dashboard.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Sticky tabs',
    description: 'Sticky tabs inspired by Vercel dashboard.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-sticky-tabs.png',
        height: 1080,
        width: 566,
        alt: 'Sticky tabs inspired by Vercel dashboard.'
      }
    ]
  },
  twitter: {
    title: 'Sticky tabs',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Sticky tabs inspired by Vercel dashboard.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-sticky-tabs.png',
        height: 1080,
        width: 566,
        alt: 'Sticky tabs inspired by Vercel dashboard.'
      }
    ]
  }
};

export default function Page() {
  const stickyTabs = findPrototype(allPrototypes, 'Sticky tabs');

  const { title, publishedAt, summary } = stickyTabs;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <InlineLink
            href="/craft"
            arrowIcon
            hideUnderline
            className="transition-colors hover:text-secondary dark:hover:text-secondary-dark"
          >
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
      <Text className="my-8">{summary}</Text>
      <Card className="flex h-40 items-center justify-center gap-12 md:gap-20">
        <StickyTabs />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={stickyTabs} route="craft" />
    </Container>
  );
}
