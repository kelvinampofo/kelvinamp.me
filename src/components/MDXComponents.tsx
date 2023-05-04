import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomLink from './CustomLink';

const MDXComponents = {
  a: CustomLink
};

interface MdxProps {
  code: string;
}

export default function MDX({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <article className="prose prose-sm md:prose-base lg:prose-base">
      <MDXContent components={{ ...MDXComponents }} />
    </article>
  );
}
