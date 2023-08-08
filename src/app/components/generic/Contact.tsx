import clsx from 'clsx';
import CustomLink from '../ui/CustomLink';

export default function Contact() {
  const contactLinks = [
    {
      label: 'Twitter',
      href: 'https://x.com/kelvinamp_'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/kelvinampofo'
    },
    {
      label: 'k@kelvinamp.me',
      href: 'mailto:k@kelvinamp.me'
    }
  ];

  return (
    <section>
      <h2 className="mb-6 font-medium">Connect</h2>
      <ul className="flex">
        {contactLinks.map((link, index) => (
          <li key={link.label} className="flex items-center">
            <CustomLink href={link.href} underline>
              {link.label}
            </CustomLink>
            <span
              className={clsx('mx-1 dark:text-neutral-400', {
                hidden: index === contactLinks.length - 1
              })}
            >
              &middot;
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
