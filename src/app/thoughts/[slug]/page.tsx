import Container from '@/components/Container';
import CustomLink from '@/components/CustomLink';
import MDXContent from '@/components/MDXComponents';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) return;

  const { title, publishedAt, summary, slug } = post;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      url: `https://kelvinamp.me/thoughts/${slug}`
    },
    twitter: {
      site: '@kelvinamp_',
      card: 'summary',
      title,
      description: summary,
      images: [
        {
          url: 'https://kelvinamp.me/og.jpeg',
          height: 1200,
          width: 1200
        }
      ]
    }
  };
}

export default async function Post({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  return (
    <Container>
      <header className="inline-flex justify-between">
        <h1 className="text-lg font-medium">
          <Balancer>{post.title}</Balancer>
        </h1>
        <span>
          <CustomLink
            href="/thoughts"
            ariaLabel="go back to thoughts page"
            arrowIcon
          >
            Back
          </CustomLink>
        </span>
      </header>
      <time className="mb-12 dark:text-neutral-400" dateTime={post.publishedAt}>
        {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
      </time>
      <MDXContent code={post.body.code} />
    </Container>
  );
}