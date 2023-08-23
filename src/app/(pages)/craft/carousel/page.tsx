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
  description: 'A minimal CSS based carousel interface.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Carousel',
    description: 'A minimal CSS based carousel interface.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/carousel/carousel.png',
        height: 1200,
        width: 1200,
        alt: 'A minimal CSS based carousel interface.'
      }
    ]
  },
  twitter: {
    title: 'Carousel',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'A minimal CSS based carousel interface.',
    images: [
      {
        url: 'https://kelvinamp.me/assets/carousel/carousel-og.png',
        height: 1200,
        width: 1200,
        alt: 'A minimal CSS based carousel interface.'
      }
    ]
  }
};

export default function Page() {
  const carouselPrototype = allPrototypes[0];

  const { title, publishedAt, summary } = carouselPrototype;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-8">
        <span>
          <CustomLink href="/craft" ariaLabel="go back to craft page" arrowIcon>
            Craft
          </CustomLink>
        </span>
        <h1 className="text-lg font-medium">
          <Balancer>{title}</Balancer>
        </h1>
      </header>
      <div className="mb-6 flex justify-between gap-2 text-sm text-[#6F6F6F] dark:text-neutral-400">
        <time dateTime={publishedAt}>{format(parseISO(publishedAt), 'MMMM yyyy')}</time>
        <CopyLinkButton />
      </div>
      <p>{summary}</p>
      <Card className="my-6">
        <Carousel />
      </Card>
    </Container>
  );
}
