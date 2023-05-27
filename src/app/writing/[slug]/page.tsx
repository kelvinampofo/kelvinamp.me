import Container from '@/components/Container';
import CopyLinkButton from '@/components/CopyLinkButton';
import CustomLink from '@/components/CustomLink';
import MDXContent from '@/components/MDXComponents';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import '../../../styles/prose.css';

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

  if (!post) {
    return;
  }

  const { title, publishedAt, summary, slug, image } = post;

  const ogImage = image
    ? `https://kelvinamp.me${image}`
    : 'https://kelvinamp.me/og.jpeg';

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

export default async function Post({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <header className="flex flex-col justify-between gap-8">
        <span>
          <CustomLink
            href="/writing"
            ariaLabel="go back to writing page"
            resetIcon
          >
            Writing
          </CustomLink>
        </span>
        <h1 className="text-lg font-medium">
          <Balancer>{post.title}</Balancer>
        </h1>
      </header>
      <div className="mb-4 flex gap-2 text-sm text-[#6F6F6F] dark:text-neutral-400">
        <time dateTime={post.publishedAt}>
          {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
        </time>
        <span>&middot;</span>
        <span>{post.readingTime.text}</span>
        <CopyLinkButton />
      </div>
      <MDXContent code={post.body.code} />
    </Container>
  );
}
