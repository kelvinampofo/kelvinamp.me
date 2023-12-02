import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import MDXContent from '@/app/components/generic/MDXComponents';
import Separator from '@/app/components/generic/Separator';
import CopyButton from '@/app/components/ui/CopyButton';
import CustomLink from '@/app/components/ui/CustomLink';
import { Navigation } from '@/app/components/ui/Navigation';
import '@/app/styles/prose.css';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allPosts.map(({ slug }) => ({
    slug: slug
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata | undefined> {
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

export default async function Post({ params }: Params) {
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
          <CustomLink
            href="/writing"
            ariaLabel="Back to writing page"
            arrowIcon
            hideUnderline
            className="p-1"
          >
            Writing
          </CustomLink>
        </span>
        <Heading>
          <Balancer>{title}</Balancer>
        </Heading>
      </header>
      <div className="mb-3 flex justify-between text-sm">
        <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
          {format(parseISO(publishedAt), 'dd MMM yyyy')}
        </time>
        <CopyButton />
      </div>
      <MDXContent code={code} />
      <Separator className="my-8" />
      <Navigation allItems={allPosts} currentItem={post} route="writing" />
    </Container>
  );
}
