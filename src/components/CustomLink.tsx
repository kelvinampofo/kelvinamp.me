import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';

export interface CustomLinkProps {
  href?: any;
  children?: React.ReactNode | React.ReactNode[];
  ariaLabel?: string;
  arrowIcon?: boolean;
  underline?: boolean;
}

export default function CustomLink({
  href,
  children,
  ariaLabel,
  arrowIcon,
  underline
}: CustomLinkProps) {
  const isInternalLink = href.startsWith('/');

  const classes = clsx(
    arrowIcon ? 'inline-flex items-center' : null,
    underline
      ? 'underline decoration-[#6F6F6F] decoration-1 underline-offset-[2.5px] dark:decoration-[neutral-400]'
      : null,
    'duration-200 ease-linear hover:text-[#6F6F6F] dark:hover:text-neutral-400'
  );

  if (isInternalLink) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {arrowIcon && (
          <ArrowTopLeftIcon
            className="mr-[3px] text-[#6F6F6F] dark:text-neutral-400"
            aria-label="ArrowTopLeft icon"
            width={18}
            height={18}
          />
        )}
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
