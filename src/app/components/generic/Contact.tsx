import c from 'clsx';
import CustomLink from '../ui/CustomLink';

export default function Contact() {
  const contactLinks = [
    {
      label: '@kelvinamp_',
      href: 'https://x.com/kelvinamp_',
      ariaLabel: 'Go to @kelvinamp_ twitter profile'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/kelvinampofo',
      ariaLabel: 'Go to GitHub profile'
    },
    {
      label: 'Email',
      href: 'mailto:k@kelvinamp.me',
      ariaLabel: 'Email Kelvin Ampofo'
    }
  ];

  return (
    <section>
      <h2 className="mb-6 font-medium">Connect</h2>
      <ul className="flex">
        {contactLinks.map((link, index) => (
          <li key={link.label} className="flex items-center">
            <CustomLink href={link.href} underline ariaLabel={link.ariaLabel}>
              {link.label}
            </CustomLink>
            <span
              className={c('mx-1 dark:text-neutral-400', {
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
