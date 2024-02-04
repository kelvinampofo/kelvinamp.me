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
import FocusedReadingPrototype from './FocusedReadingPrototype';

export const metadata: Metadata = {
  title: 'Focused reading',
  description: 'Focused reading mode. Hold shift+F to toggle on/off.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Focused reading',
    description: 'Focused reading mode. Hold shift+F to toggle on/off.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-focused-reading.png',
        height: 1200,
        width: 1200,
        alt: 'Focused reading mode. Hold shift+F to toggle on/off.'
      }
    ]
  },
  twitter: {
    title: 'Focused reading',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Focused reading mode. Hold shift+F to toggle on/off.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/og-images/og-loading-states.png',
        height: 1200,
        width: 1200,
        alt: 'Focused reading mode. Hold shift+F to toggle on/off.'
      }
    ]
  }
};

export default function Page() {
  const focusedReading = findPrototype(allPrototypes, 'Focused reading');

  const { title, publishedAt, summary } = focusedReading;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <CustomLink
            href="/craft"
            arrowIcon
            hideUnderline
            className="transition-colors hover:text-secondary dark:hover:text-secondary-dark"
          >
            Craft
          </CustomLink>
        </span>
        <Heading className="text-lg font-medium">{title}</Heading>
      </header>
      <div className="flex justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <Text className="mb-6 mt-8 text-sm md:text-base">{summary}</Text>
      <FocusedReadingPrototype />
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={focusedReading} route="craft" />
    </Container>
  );
}
