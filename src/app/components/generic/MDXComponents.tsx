import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomLink from '../ui/CustomLink';
import Heading from './Heading';

const MDXComponents = {
  a: CustomLink,
  Heading
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
