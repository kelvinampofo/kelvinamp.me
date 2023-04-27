import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import CustomLink from './CustomLink';

export const getStaticProps = () => {
  const post = allPosts[0];
  return { props: { post } };
};

const MDXComponents = {
  CustomLink
};
interface MdxProps {
  code: string;
}

export default function Mdx({ code }: MdxProps) {
  const MDXComponent = useMDXComponent(code);

  return (
    <article>
      <MDXComponent components={{ ...MDXComponents }} />
    </article>
  );
}
