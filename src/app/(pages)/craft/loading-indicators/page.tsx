import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CopyButton from '@/app/components/ui/CopyButton';
import CustomLink from '@/app/components/ui/CustomLink';
import { Navigation } from '@/app/components/ui/Navigation';
import { allPrototypes } from '@/app/lib/prototypes';
import { findPrototype } from '@/app/lib/utils';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import Loading from './Loading';

export const metadata: Metadata = {
  title: 'Loading indicators',
  description: 'Simple loading state indicators.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Loading indicators',
    description: 'Simple loading state indicators.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-loading-states.png',
        height: 1200,
        width: 1200,
        alt: 'Simple loading state indicators.'
      }
    ]
  },
  twitter: {
    title: 'Loading indicators',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Simple loading state indicators.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-loading-states.png',
        height: 1200,
        width: 1200,
        alt: 'Simple loading state indicators.'
      }
    ]
  }
};

export default function Page() {
  const loadingIndicators = findPrototype(allPrototypes, 'Loading indicators');

  const { title, publishedAt, summary } = loadingIndicators;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <CustomLink href="/craft" arrowIcon hideUnderline className="p-1">
            Craft
          </CustomLink>
        </span>
        <Heading className="text-lg font-medium">{title}</Heading>
      </header>
      <div className="flex justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <Text className="my-8">{summary}</Text>
      <Card className="flex h-40 items-center justify-center gap-12 md:gap-20">
        <Loading variant="ios-spinner" />
        <Loading variant="primary-spinner" />
        <Loading variant="secondary-spinner" />
        <Loading variant="loading-dots" />
        <Loading variant="loading-text" />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={loadingIndicators} route="craft" />
    </Container>
  );
}
