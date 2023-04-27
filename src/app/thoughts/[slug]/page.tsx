import Container from '@/components/Container';
import CustomLink from '@/components/CustomLink';
import Mdx from '@/components/Mdx';
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

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    slug
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://kelvinamp.me/thoughts/${slug}`
    }
  };
}

export default async function Post({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) return notFound();

  return (
    <Container>
      <header className="inline-flex justify-between">
        <h1 className="text-xl font-medium">
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
      <time className="mb-6 dark:text-neutral-400" dateTime={post.publishedAt}>
        {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
      </time>
      <Mdx code={post.body.code} />
    </Container>
  );
}
