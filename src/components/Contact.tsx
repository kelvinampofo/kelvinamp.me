import { cn } from '@/lib/utils';

export default function Contact() {
  const links = [
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
    }
  ];

  return (
    <section>
      <h2 className="mb-6">Connect</h2>
      <ul className="flex gap-1">
        <>
          {links.map((link, index) => (
            <li key={link.label} className="flex gap-1">
              <a
                href={link.href}
                className={cn(
                  'underline decoration-[#A0A0A0] decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-gray-500 dark:text-[#E5E5E5]'
                )}
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
