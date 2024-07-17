import Heading from '@/app/components/generic/Heading';
import InlineLink from '@/app/components/ui/InlineLink';
import c from 'clsx';

export default function Contact() {
  const contactLinks = [
    {
      label: '@kelvinamp_',
      href: 'https://x.com/kelvinamp_',
      ariaLabel: 'twitter profile'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/kelvinampofo',
      ariaLabel: 'github profile'
    },
    {
      label: 'Are.na',
      href: 'https://www.are.na/kelvin-ampofo/channels',
      ariaLabel: 'are.na profile'
    },
    {
      label: 'Email',
      href: 'mailto:k@kelvinamp.me'
    }
  ];

  return (
    <>
      <Heading as="h2" className="mb-6">
        Connect
      </Heading>
      <ul className="flex">
        {contactLinks.map(({ label, href, ariaLabel }, index) => (
          <li key={label}>
            <InlineLink href={href} ariaLabel={ariaLabel}>
              {label}
            </InlineLink>
            <span
              className={c(
                'mx-1 text-secondary dark:text-secondary-dark',
                index === contactLinks.length - 1 && 'hidden'
              )}
              aria-hidden="true"
            >
              &middot;
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
