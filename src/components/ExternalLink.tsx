export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
}

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      className="underline decoration-neutral-500 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-gray-500"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="opens in a new tab"
    >
      {children}
    </a>
  );
}
