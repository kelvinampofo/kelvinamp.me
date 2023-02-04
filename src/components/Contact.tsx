import { Links } from '@/types';

export default function Contact() {
  const links: Links[] = [
    {
      label: 'Twitter',
      href: 'https://twitter.com/kelvinamp_'
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/kelvinamp_'
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
      <ul className="flex gap-1">
        <>
          {links.map((link: Links, index: number) => (
            <li key={link.label} className="flex gap-1">
              <a
                href={link.href}
                className="underline decoration-neutral-500 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-gray-500"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
              {index !== links.length - 1 && <span>&middot;</span>}
            </li>
          ))}
        </>
      </ul>
    </section>
  );
}
