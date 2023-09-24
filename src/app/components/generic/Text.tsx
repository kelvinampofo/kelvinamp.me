import c from 'clsx';
import { HTMLProps } from 'react';

interface TextProps extends HTMLProps<HTMLParagraphElement | HTMLDivElement | HTMLSpanElement> {
  as?: 'p' | 'div' | 'span';
  weight?: 'regular' | 'medium' | 'bold';
  colour?: 'primary' | 'secondary';
}

export default function Text({
  as: Tag = 'p',
  weight = 'regular',
  colour = 'primary',
  className,
  children
}: TextProps) {
  const weightClasses = c(
    weight === 'regular' && 'font-normal',
    weight === 'medium' && 'font-medium',
    weight === 'bold' && 'font-bold'
  );

  const colourClasses = c(
    colour === 'primary' && 'text-[#161616]',
    colour === 'primary' && 'dark:text-[#EDEDED]',
    colour === 'secondary' && 'text-[#6F6F6F]',
    colour === 'secondary' && 'dark:text-[#A0A0A0]'
  );

  return <Tag className={c(weightClasses, colourClasses, className)}>{children}</Tag>;
}
