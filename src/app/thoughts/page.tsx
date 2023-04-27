import Container from '@/components/Container';
import CustomLink from '@/components/CustomLink';
import { allPosts } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thoughts',
  description: 'Infrequent thoughts on code, design and things in between.'
};

export default function Thoughts() {
  return (
    <Container>
      <h1 className="mb-6 text-xl font-medium">Thoughts</h1>
      <p className="mb-12">
        Infrequent thoughts on code, design and things in between.
      </p>
      {allPosts
        .sort((a, b) => {
          return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
        })
        .map((post, index) => (
          <>
            <CustomLink
              href={`/thoughts/${post.slug}`}
              key={index}
              underline={false}
            >
              <div className="flex justify-between">
                {post.title}
                <time className="dark:text-neutral-400">
                  {format(parseISO(post.publishedAt), 'dd MMMM, yyyy')}
                </time>
              </div>
            </CustomLink>
            <hr className="my-6 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
          </>
        ))}
      <span className="mt-6">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Index
        </CustomLink>
      </span>
    </Container>
  );
}
