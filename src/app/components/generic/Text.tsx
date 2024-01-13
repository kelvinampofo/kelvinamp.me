import c from 'clsx';
import { HTMLProps } from 'react';

interface TextProps
  extends Omit<HTMLProps<HTMLParagraphElement | HTMLDivElement | HTMLSpanElement>, 'size'> {
  as?: 'p' | 'div' | 'span';
  weight?: 'regular' | 'medium' | 'bold';
  colour?: 'primary' | 'secondary';
  size?: 'xsmall' | 'small' | 'normal' | 'large';
}

export default function Text({
  as: Tag = 'span',
  weight = 'regular',
  colour = 'primary',
  size = 'normal',
  className,
  children
}: TextProps) {
  const weights = c(
    weight === 'regular' && 'font-normal',
    weight === 'medium' && 'font-medium',
    weight === 'bold' && 'font-bold'
  );

  const colours = c(
    colour === 'primary' && 'text-primary dark:text-primary-dark',
    colour === 'secondary' && 'text-secondary dark:text-secondary-dark'
  );

  const sizes = c(
    size === 'xsmall' && 'text-xs',
    size === 'small' && 'text-sm',
    size === 'normal' && 'text-base',
    size === 'large' && 'text-lg'
  );

  return <Tag className={c(weights, colours, sizes, className)}>{children}</Tag>;
}
