import c from 'clsx';
import { HTMLProps } from 'react';

interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Heading({ children, className, level = 'h1', ...rest }: HeadingProps) {
  const fontSizeClass = level === 'h1' ? 'text-lg' : 'text-base';

  const HeadingTag = level;

  return (
    <HeadingTag className={c('font-medium', fontSizeClass, className)} {...rest}>
      {children}
    </HeadingTag>
  );
}
