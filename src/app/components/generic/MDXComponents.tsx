import c from 'clsx';
import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomLink from '../ui/CustomLink';

const MDXComponents = {
  a: CustomLink
};

interface MdxProps {
  code: string;
}

export default function MDX({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <article
      className={c(
        'prose prose-sm md:prose-base prose-headings:font-medium prose-headings:text-primary prose-h2:text-base dark:prose-headings:text-primary-dark'
      )}
    >
      <MDXContent components={{ ...MDXComponents }} />
    </article>
  );
}
