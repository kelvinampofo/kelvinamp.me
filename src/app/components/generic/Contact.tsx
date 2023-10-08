import c from 'clsx';
import CustomLink from '../ui/CustomLink';
import Heading from './Heading';

export default function Contact() {
  const contactLinks = [
    {
      label: '@kelvinamp_',
      href: 'https://x.com/kelvinamp_',
      ariaLabel: 'go to @kelvinamp_ twitter profile'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/kelvinampofo',
      ariaLabel: 'go to github profile'
    },
    {
      label: 'Email',
      href: 'mailto:k@kelvinamp.me',
      ariaLabel: 'email kelvin ampofo'
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
            >
              &middot;
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
