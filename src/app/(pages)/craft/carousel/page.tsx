import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import CopyLinkButton from '@/app/components/ui/CopyLinkButton';
import CustomLink from '@/app/components/ui/CustomLink';
import { allPrototypes } from '@/app/data/prototypes';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import Balancer from 'react-wrap-balancer';
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
        url: 'https://kelvinamp.me/assets/carousel/og-carousel.png',
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
        url: 'https://kelvinamp.me/assets/carousel/og-carousel.png',
        height: 1200,
        width: 1200,
        alt: 'A minimal CSS based carousel.'
      }
    ]
  }
};

export default function Page() {
  const carouselPrototype = allPrototypes[0];

  const { title, publishedAt, summary } = carouselPrototype;

  return (
    <Container className="lg:pt-20">
      <header className="flex flex-col justify-between gap-6">
        <span>
          <CustomLink href="/craft" ariaLabel="go back to craft page" arrowIcon>
            Craft
          </CustomLink>
        </span>
        <h1 className="text-lg font-medium">
          <Balancer>{title}</Balancer>
        </h1>
      </header>
      <div className="flex justify-between text-sm text-[#6F6F6F] dark:text-neutral-400">
        <time dateTime={publishedAt}>{format(parseISO(publishedAt), 'MMMM yyyy')}</time>
        <CopyLinkButton />
      </div>
      <p className="my-8">{summary}</p>
      <Card className="flex md:px-2 md:pt-8 lg:px-2 lg:pt-8">
        <Carousel />
      </Card>
    </Container>
  );
}
