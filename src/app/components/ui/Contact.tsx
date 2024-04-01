import Heading from '@/app/components/generic/Heading';
import CustomLink from '@/app/components/ui/CustomLink';
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
      ariaLabel: 'gitHub profile'
    },
    {
      label: 'Email',
      href: 'mailto:k@kelvinamp.me',
      ariaLabel: 'email address'
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
