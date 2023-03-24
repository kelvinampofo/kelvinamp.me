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
      <h2 className="mb-6 font-medium dark:text-white">Connect</h2>
      <nav>
        <ul className="flex">
          {links.map((link, index) => (
            <li key={index} className="flex items-center">
              <a
                href={link.href}
                className="underline decoration-neutral-500 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-gray-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
              {index !== links.length - 1 && (
                <span className="mx-1">&middot;</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
