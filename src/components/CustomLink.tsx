import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';

export interface CustomLinkProps {
  href: any;
  children: React.ReactNode | React.ReactNode[];
  ariaLabel?: string;
  arrowIcon?: boolean;
  underline?: boolean;
}

export default function CustomLink({
  href,
  children,
  ariaLabel,
  arrowIcon,
  underline = true
}: CustomLinkProps) {
  const isInternalLink = href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className={clsx(
          arrowIcon ? 'inline-flex items-center' : '',
          underline
            ? 'underline decoration-[#6F6F6F] decoration-1 underline-offset-4 dark:decoration-neutral-400'
            : '',
          'duration-500 ease-linear hover:text-[#6F6F6F]  dark:hover:text-neutral-400'
        )}
        aria-label={ariaLabel}
      >
        {arrowIcon && (
          <ArrowTopLeftIcon
            className="mr-[3px]"
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
      className="underline decoration-neutral-400 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:decoration-neutral-500 dark:hover:text-neutral-400"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
