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
import Balancer from 'react-wrap-balancer';
import Loading from './Loading';

export const metadata: Metadata = {
  title: 'Loading states',
  description: 'Loading state interfaces.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Loading states',
    description: 'Loading state interfaces.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-loading-states',
        height: 1200,
        width: 1200,
        alt: 'Loading state interfaces.'
      }
    ]
  },
  twitter: {
    title: 'Loading states',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Loading state interfaces.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-loading-states',
        height: 1200,
        width: 1200,
        alt: 'Loading state interfaces.'
      }
    ]
  }
};

export default function Page() {
  const loadingStatePrototypes = findPrototype(allPrototypes, 'Loading states');

  const { title, publishedAt, summary } = loadingStatePrototypes;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <CustomLink href="/craft" ariaLabel="go back to craft page" arrowIcon hideUnderline>
            Craft
          </CustomLink>
        </span>
        <Heading className="text-lg font-medium">
          <Balancer>{title}</Balancer>
        </Heading>
      </header>
      <div className="flex justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <Text className="my-8">{summary}</Text>
      <Card className="flex h-40 items-center justify-center gap-16">
        <Loading variant="spinner" />
        <Loading variant="dots" />
        <Loading variant="loading-text" />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={loadingStatePrototypes} route="craft" />
    </Container>
  );
}
