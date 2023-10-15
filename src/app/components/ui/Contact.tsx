import Heading from '@/app/components/generic/Heading';
import CustomLink from '@/app/components/ui/CustomLink';
import c from 'clsx';

export default function Contact() {
  const contactLinks = [
    {
      label: '@kelvinamp_',
      href: 'https://x.com/kelvinamp_',
      ariaLabel: 'Twitter profile'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/kelvinampofo',
      ariaLabel: 'GitHub profile'
    },
    {
      label: 'Email',
      href: 'mailto:k@kelvinamp.me',
      ariaLabel: 'Email address'
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
            <CustomLink href={href} ariaLabel={ariaLabel}>
              {label}
            </CustomLink>
            <span
              className={c(
                'mx-1 dark:text-secondary-dark',
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
