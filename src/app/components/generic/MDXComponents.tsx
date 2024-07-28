import c from 'clsx';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import InlineLink from '../ui/InlineLink';

const MDXComponents = {
  a: InlineLink
};

interface MdxProps {
  code: string;
}

export default function MDX({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <article
      className={c(
        'prose prose-sm md:prose-base prose-headings:font-medium prose-headings:text-primary prose-h2:text-base prose-code:before:content-none prose-code:after:content-none dark:prose-headings:text-primary-dark'
      )}
    >
      <MDXContent components={{ ...MDXComponents }} />
    </article>
  );
}
