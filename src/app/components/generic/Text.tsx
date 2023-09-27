import c from 'clsx';
import { HTMLProps } from 'react';

interface TextProps
  extends Omit<HTMLProps<HTMLParagraphElement | HTMLDivElement | HTMLSpanElement>, 'size'> {
  as?: 'p' | 'div' | 'span';
  weight?: 'regular' | 'medium' | 'bold';
  colour?: 'primary' | 'secondary';
  size?: 'small' | 'normal' | 'large';
}

export default function Text({
  as: Tag = 'p',
  weight = 'regular',
  colour = 'primary',
  size = 'normal',
  className,
  children
}: TextProps) {
  const weightClasses = c(
    weight === 'regular' && 'font-normal',
    weight === 'medium' && 'font-medium',
    weight === 'bold' && 'font-bold'
  );

  const colourClasses = c(
    colour === 'primary' && 'text-primary',
    colour === 'primary' && 'dark:text-primary-dark',
    colour === 'secondary' && 'text-secondary',
    colour === 'secondary' && 'dark:text-secondary-dark'
  );

  const sizeClasses = c(
    size === 'small' && 'text-xs md:text-sm',
    size === 'normal' && 'md:text-base',
    size === 'large' && 'md:text-lg'
  );

  return <Tag className={c(weightClasses, colourClasses, sizeClasses, className)}>{children}</Tag>;
}
