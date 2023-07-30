import Container from '@/app/components/Container';
import CopyLinkButton from '@/app/components/CopyLinkButton';
import CustomLink from '@/app/components/CustomLink';
import MDXContent from '@/app/components/MDXComponents';
import '@/app/styles/prose.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
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

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return;
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

export default async function Post({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const currentIndex = allPosts.findIndex((post) => post.slug === params.slug);
  const previousPost = allPosts[currentIndex - 1];
  const nextPost = allPosts[currentIndex + 1];

  return (
    <Container>
      <header className="flex flex-col justify-between gap-8">
        <span>
          <CustomLink href="/writing" ariaLabel="go back to writing page" arrowIcon>
            Writing
          </CustomLink>
        </span>
        <h1 className="text-lg font-medium">
          <Balancer>{post.title}</Balancer>
        </h1>
      </header>
      <div className="mb-3 flex justify-between gap-2 text-sm text-[#6F6F6F] dark:text-neutral-400">
        <time dateTime={post.publishedAt}>
          {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
        </time>
        <CopyLinkButton />
      </div>
      <MDXContent code={post.body.code} />
      <hr className="my-3 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      <section className="mt-2 flex justify-between text-sm">
        {previousPost && (
          <CustomLink href={`/writing/${previousPost.slug}`}>
            <div className="flex flex-col gap-1">
              <span>
                <ArrowLeftIcon className="mr-1 inline-flex" />
                {previousPost.title}
              </span>
            </div>
          </CustomLink>
        )}
        <div className="flex grow" /> {/* fill remaining space */}
        {nextPost && (
          <CustomLink href={`/writing/${nextPost.slug}`}>
            <div className="flex flex-col gap-1">
              <span>
                {nextPost.title} <ArrowRightIcon className="ml-1 inline-flex" />
              </span>
            </div>
          </CustomLink>
        )}
      </section>
    </Container>
  );
}
