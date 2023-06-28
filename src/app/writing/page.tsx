import Container from '@/app/_components/Container';
import CustomLink from '@/app/_components/CustomLink';
import { allPosts } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  publisher: 'Kelvin Ampofo',
  authors: [{ name: 'Kelvin Ampofo' }],
  description: 'Infrequent written thoughts.',
  openGraph: {
    title: 'Writing',
    description: 'Infrequent written thoughts.'
  },
  twitter: {
    title: 'Writing',
    site: '@kelvinamp_',
    creator: '@kelvinamp',
    card: 'summary',
    description: 'Infrequent written thoughts.',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        height: 1200,
        width: 1200
      }
    ]
  }
};

export default function Writing() {
  return (
    <Container>
      <h1 className="mb-6 text-lg font-medium">Writing</h1>
      <p className="mb-12 text-[#6F6F6F] dark:text-neutral-400">
        Infrequent thoughts on design, technology and things in between.
      </p>
      <hr className="mb-3 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      {allPosts
        .sort((a, b) => {
          return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
        })
        .map((post) => {
          return (
            <>
              <CustomLink href={`/writing/${post.slug}`} key={post._id}>
                <div className="flex justify-between">
                  <span className="font-medium">{post.title}</span>
                  <time className="text-[#6F6F6F] dark:text-neutral-400">
                    {format(parseISO(post.publishedAt), 'dd/MM/yy')}
                  </time>
                </div>
              </CustomLink>
              <hr className="my-3 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
            </>
          );
        })}
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
