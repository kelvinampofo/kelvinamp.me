import c from 'clsx';
import { HTMLProps } from 'react';

interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Heading({
  children,
  className,
  as: HeadingTag = 'h1',
  ...rest
}: HeadingProps) {
  const fontSizeClass = HeadingTag === 'h1' ? 'text-lg' : 'text-base';

  return (
    <HeadingTag className={c('font-medium', fontSizeClass, className)} {...rest}>
      {children}
    </HeadingTag>
  );
}
