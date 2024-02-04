import c from 'clsx';
import Link from 'next/link';
import { Icon } from './Icon';

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

  const classes = c(
    'transition-colors dark:hover:decoration-secondary-dark hover:decoration-secondary',
    children === 'Back' && 'hover:text-secondary dark:hover:text-secondary-dark',
    !hideUnderline &&
      'underline decoration-neutral-300 decoration-1 underline-offset-2 dark:decoration-[#505050]',
    arrowIcon && 'inline-flex items-center gap-1 rounded-sm leading-5 -m-1 p-1 text-sm',
    className
  );

  if (isInternalLink) {
    return (
      <Link href={href} className={c(classes)} aria-label={ariaLabel}>
        {arrowIcon && (
          <Icon
            name="arrow-top-left"
            className="translate-y-[1.5px]"
            aria-hidden="true"
            width={15}
            height={15}
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
