import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import Heading from "./src/components/heading/Heading";
import Separator from "./src/components/separator/Separator";

type Props<T extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T>;

const createHeading = <T extends "h1" | "h2" | "h3" | "h4">(as: T) => {
  const HeadingComponent = ({ children, ...props }: Props<T>) => (
    <Heading as={as} {...props}>
      {children}
    </Heading>
  );

  HeadingComponent.displayName = `Heading(${as})`;
  return HeadingComponent;
};

const Anchor = ({ href, children, ...props }: Props<"a">) => {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className="prose-link" {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a href={href} className="prose-link" {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="prose-link"
      {...props}
    >
      {children}
    </a>
  );
};

const Code = ({ children, className, ...props }: Props<"code">) => {
  // for code blocks (className present), render raw text; for inline code, render HTML.
  if (className) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
  return (
    <code dangerouslySetInnerHTML={{ __html: children as string }} {...props} />
  );
};

const components = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),

  p: (props: Props<"p">) => <p {...props} />,

  ol: (props: Props<"ul">) => <ol {...props} className="prose-list" />,
  ul: (props: Props<"ul">) => <ul {...props} className="prose-list" />,
  li: (props: Props<"li">) => <li {...props} className="prose-list" />,

  em: (props: Props<"em">) => <em {...props} />,
  strong: (props: Props<"strong">) => <strong {...props} />,

  a: Anchor,

  pre: (props: Props<"pre">) => <pre className="prose-pre" {...props} />,
  code: Code,

  blockquote: (props: Props<"blockquote">) => (
    <blockquote className="prose-blockquote" {...props} />
  ),

  hr: () => <Separator />,
};

export function useMDXComponents(): MDXComponents {
  return {
    ...components,
  };
}
