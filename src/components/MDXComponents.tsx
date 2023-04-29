import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomLink from './CustomLink';

const MDXComponents = {
  Link: CustomLink
};

interface MdxProps {
  code: string;
}

export default function MDX({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <article>
      <MDXContent components={{ ...MDXComponents }} />
    </article>
  );
}
