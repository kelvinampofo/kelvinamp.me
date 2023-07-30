import Container from '@/app/components/Container';
import CustomLink from '@/app/components/CustomLink';
import { allPosts } from 'contentlayer/generated';
import { compareDesc, format, isWithinInterval, parseISO, subMonths } from 'date-fns';
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
  const currentDate = new Date();

  return (
    <Container>
      <h1 className="mb-6 text-lg font-medium">Writing</h1>
      <p className="mb-12 text-[#6F6F6F] dark:text-neutral-400">
        Infrequent thoughts on design, technology and things in between.
      </p>
      <hr className="mb-3 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      {allPosts
        .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
        .map((post) => {
          const postDate = parseISO(post.publishedAt);

          const isWithin2Months = isWithinInterval(postDate, {
            start: subMonths(currentDate, 2),
            end: currentDate
          });

          return (
            <>
              <CustomLink href={`/writing/${post.slug}`} key={post._id}>
                <div className="flex justify-between">
                  <span className="font-medium">
                    {post.title}{' '}
                    {isWithin2Months && (
                      <span className="ml-2 bg-gradient-to-r from-teal-300 to-blue-600 bg-clip-text align-top text-xs text-transparent hover:animate-[pulse_1.40s_ease-in-out_infinite]">
                        new
                      </span>
                    )}
                  </span>
                  <time className="text-[#6F6F6F] dark:text-neutral-400">
                    {format(postDate, 'dd/MM/yy')}
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
