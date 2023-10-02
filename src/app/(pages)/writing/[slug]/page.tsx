import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import MDXContent from '@/app/components/generic/MDXComponents';
import Separator from '@/app/components/generic/Separator';
import CopyLinkButton from '@/app/components/ui/CopyLinkButton';
import CustomLink from '@/app/components/ui/CustomLink';
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
  return allPosts.map(({ slug }) => ({
    slug: slug
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
  const { slug } = params;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const {
    title,
    publishedAt,
    body: { code }
  } = post;

  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <Container>
      <header className="flex flex-col justify-between gap-6">
        <span>
          <CustomLink href="/writing" ariaLabel="go back to writing page" hideUnderline arrowIcon>
            Writing
          </CustomLink>
        </span>
        <Heading>
          <Balancer>{title}</Balancer>
        </Heading>
      </header>
      <div className="mb-3 flex justify-between text-sm text-[#6F6F6F] dark:text-[#A0A0A0]">
        <time dateTime={publishedAt}>{format(parseISO(publishedAt), 'dd MMM yyyy')}</time>
        <CopyLinkButton />
      </div>
      <MDXContent code={code} />
      <Separator className="my-8" />
      <nav className="flex list-none justify-between text-sm">
        {previousPost && (
          <CustomLink
            href={`/writing/${previousPost.slug}`}
            ariaLabel="Previous post"
            hideUnderline
          >
            <div className="flex flex-col gap-1">
              <ArrowLeftIcon className="text-[#6F6F6F] dark:text-[#A0A0A0]" />
              {previousPost.title}
              <span className="sr-only">Previous</span>
            </div>
          </CustomLink>
        )}
        <div className="flex grow" /> {/* fill remaining space */}
        {nextPost && (
          <CustomLink href={`/writing/${nextPost.slug}`} ariaLabel="Next post" hideUnderline>
            <div className="flex flex-col items-end gap-1">
              <ArrowRightIcon className="flex-1 text-[#6F6F6F] dark:text-[#A0A0A0]" />
              {nextPost.title}
              <span className="sr-only">Next</span>
            </div>
          </CustomLink>
        )}
      </nav>
    </Container>
  );
}
