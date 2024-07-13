import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import CopyButton from '@/app/components/ui/CopyButton';
import InlineLink from '@/app/components/ui/InlineLink';
import Navigation from '@/app/components/ui/Navigation/Navigation';
import { allPrototypes } from '@/app/lib/prototypes';
import { findPrototype } from '@/app/lib/utils';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import VoiceInput from './VoiceInput';

const voiceInput = findPrototype(allPrototypes, 'Voice Input');
const { title, publishedAt, summary, image } = voiceInput;

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
        <Heading className="text-lg font-medium">{title}</Heading>
      </header>
      <div className="flex items-center justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <p className="mt-8">{summary}</p>
      <Card className="caravaggio-background-image mt-8 flex h-48 items-center justify-center gap-12 md:gap-20">
        <VoiceInput />
      </Card>
      <span className="pt-2 text-center text-xs text-secondary dark:text-secondary-dark">
        Painting by Caravaggio.
      </span>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={voiceInput} route="craft" />
    </Container>
  );
}
