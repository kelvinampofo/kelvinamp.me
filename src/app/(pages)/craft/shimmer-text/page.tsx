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
import ShimmerText from './ShimmerText';

const shimmerText = findPrototype(allPrototypes, 'Shimmer text');

const { title, publishedAt, summary, image } = shimmerText;

const phrases = [
  'Crafting the solution',
  'Thinking',
  'Analysing',
  'Searching the web',
  'Assessing',
  'Reasoning'
];

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
        <p className="mt-8">
          Loading shimmer text from{' '}
          <InlineLink href="https://openai.com/o1/#ui-video">OpenAI o1</InlineLink>.
        </p>
      </div>
      <Card className="mt-8 flex h-48 items-center justify-center gap-12 md:gap-20">
        <ShimmerText>{phrases}</ShimmerText>
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={shimmerText} route="craft" />
    </Container>
  );
}
