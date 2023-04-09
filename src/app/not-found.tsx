import Container from '@/components/Container';
import { ArrowTopLeftIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 – Not Found'
};

export default function NotFound() {
  return (
    <Container>
      <h1 className="mb-6 text-xl font-medium">Not Found</h1>
      <section>
        <p className="mb-6">
          Been looking high and low, far and wide but couldn&apos;t find the
          page you&apos;re looking for. Maybe it&apos;s on vacation, or maybe
          it&apos;s just shy.
        </p>
        <p>Either way, apologies for the inconvenience.</p>
      </section>
      <span className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center underline decoration-neutral-300 decoration-1 underline-offset-4 duration-500 ease-in-out hover:text-neutral-500 dark:decoration-neutral-500 dark:hover:text-neutral-400"
          aria-label="Go to home page"
        >
          <ArrowTopLeftIcon
            className="mr-1 text-neutral-500 dark:text-neutral-400"
            aria-label="Top left arrow icon"
          />
          Index
        </Link>
      </span>
    </Container>
  );
}
