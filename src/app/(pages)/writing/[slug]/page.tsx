import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import MDXContent from '@/app/components/generic/MDXComponents';
import Separator from '@/app/components/generic/Separator';
import CopyButton from '@/app/components/ui/CopyButton';
import FocusedReading from '@/app/components/ui/FocusedReading';
import InlineLink from '@/app/components/ui/InlineLink';
import '@/app/styles/prose.css';
import Navigation from '@/app/components/ui/Navigation/Navigation';
import { allPosts } from 'contentlayer/generated';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map(({ slug }) => ({
    slug: slug
  }));
}

export async function generateMetadata(props: Params): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const { title, publishedAt, summary, slug, image } = post;

  const ogImage = image ? `https://kelvinamp.me${image}` : 'https://kelvinamp.me/og.jpeg';

  return {
    title,
    publisher: 'Kelvin Ampofo',
    authors: [{ name: 'Kelvin Ampofo' }],
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      url: `https://kelvinamp.me/writing/${slug}`,
      images: [
        {
          url: ogImage,
          alt: summary
        }
      ]
    },
    twitter: {
      site: '@kelvinamp_',
      card: 'summary_large_image',
      creator: '@kelvinamp',
      title,
      description: summary,
      images: [
        {
          url: ogImage,
          alt: summary
        }
      ]
    }
  };
}

export default async function Post(props: Params) {
  const params = await props.params;
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const {
    title,
    publishedAt,
    body: { code }
  } = post;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <InlineLink href="/writing" ariaLabel="Back to writing page" arrowIcon hideUnderline>
            Writing
          </InlineLink>
        </span>
        <Heading>{title}</Heading>
      </header>
      <div className="mb-6 flex items-center justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'MMMM dd yyyy')}
        </time>
        <CopyButton />
      </div>
      <FocusedReading>
        <MDXContent code={code} />
      </FocusedReading>
      <Separator className="my-8" />
      <Navigation allItems={allPosts} currentItem={post} route="writing" />
    </Container>
  );
}
