import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';

export interface CustomLinkProps {
  href?: any;
  children?: React.ReactNode;
  ariaLabel?: string;
  arrowIcon?: boolean;
  hideUnderline?: boolean;
  className?: string;
}

export default function CustomLink({
  href,
  children,
  ariaLabel,
  arrowIcon,
  hideUnderline,
  className
}: CustomLinkProps) {
  const isInternalLink = href.startsWith('/');

  if (children === 'Back') {
    hideUnderline = true;
  }

  const classes = clsx(
    className,
    !hideUnderline &&
      'underline decoration-neutral-300 decoration-1 underline-offset-[2.5px] dark:decoration-[#505050]',
    'duration-150 ease-linear hover:text-[#6F6F6F] dark:hover:text-neutral-400'
  );

  if (isInternalLink) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {arrowIcon && (
          <ArrowTopLeftIcon
            className="mr-1 inline-flex items-center"
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
