import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';

export interface CustomLinkProps {
  href?: any;
  children?: React.ReactNode;
  ariaLabel?: string;
  arrowIcon?: boolean;
  resetIcon?: boolean;
  underline?: boolean;
}

export default function CustomLink({
  href,
  children,
  ariaLabel,
  arrowIcon,
  resetIcon,
  underline
}: CustomLinkProps) {
  const isInternalLink = href.startsWith('/');

  const classes = clsx(
    (arrowIcon || resetIcon) && 'inline-flex items-center',
    underline &&
      'underline decoration-neutral-300 decoration-1 underline-offset-[2.5px] dark:decoration-[#505050]',
    'duration-150 ease-linear hover:text-[#6F6F6F] dark:hover:text-neutral-400'
  );

  if (isInternalLink) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {arrowIcon && (
          <ArrowTopLeftIcon
            className="mr-1"
            aria-label="Arrow Top Left icon"
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
