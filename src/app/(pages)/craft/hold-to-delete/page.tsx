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
import HoldToDelete from './HoldToDelete';

const holdToDelete = findPrototype(allPrototypes, 'Hold to delete');
const { title, publishedAt, summary, image } = holdToDelete;

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
      <div className="flex flex-col gap-2">
        <p className="mt-8">
          Derived from Apple&apos;s swipe-to-delete and{' '}
          <InlineLink href="https://www.reddit.com/r/web_design/comments/247nb2/hold_to_delete_pingdoms_clever_alternative_to_the/">
            Pingdom&apos;s hold-to-delete
          </InlineLink>{' '}
          interactions&mdash;offers a more subtle and delightful way to confirm deletion, rather
          than a confirmation modal.
        </p>
      </div>
      <Card className="mt-8 flex h-48 items-center justify-center gap-12 md:gap-20">
        <HoldToDelete />
      </Card>
      <Separator className="my-8" />
      <Navigation allItems={allPrototypes} currentItem={holdToDelete} route="craft" />
    </Container>
  );
}
