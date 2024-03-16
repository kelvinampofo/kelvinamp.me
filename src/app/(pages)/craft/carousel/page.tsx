import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CopyButton from '@/app/components/ui/CopyButton';
import CustomLink from '@/app/components/ui/CustomLink';
import Navigation from '@/app/components/ui/Navigation/Navigation';
import { allPrototypes } from '@/app/lib/prototypes';
import { findPrototype } from '@/app/lib/utils';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import Carousel from './Carousel';

export const metadata: Metadata = {
  title: 'Carousel',
  description: 'A minimal CSS based carousel.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Carousel',
    description: 'A minimal CSS based carousel.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/carousel/og-carousel.png',
        height: 1200,
        width: 1200,
        alt: 'A minimal CSS based carousel.'
      }
    ]
  },
  twitter: {
    title: 'Carousel',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'A minimal CSS based carousel.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/images/carousel/og-carousel.png',
        height: 1200,
        width: 1200,
        alt: 'A minimal CSS based carousel.'
      }
    ]
  }
};

export default function Page() {
  const carouselPrototype = findPrototype(allPrototypes, 'Carousel');

  const { title, publishedAt, summary } = carouselPrototype;

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
      <div className="flex items-center justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <Text className="my-8">{summary}</Text>
      <Carousel />
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={carouselPrototype} route="craft" />
    </Container>
  );
}
