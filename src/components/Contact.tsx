import CustomLink from './CustomLink';

export default function Contact() {
  const links = [
    {
      label: 'Twitter',
      href: 'https://twitter.com/kelvinamp_'
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
        {links.map((link, index) => (
          <li key={index} className="flex items-center">
            <CustomLink href={link.href}>{link.label}</CustomLink>
            {index !== links.length - 1 && (
              <span className="mx-1 dark:text-neutral-400">&middot;</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
