import { Metadata } from 'next';

import Container from '@/app/components/generic/Container';

import InlineLink from './components/ui/InlineLink';

export const metadata: Metadata = {
  title: '404',
  description: 'Not found.',
  openGraph: {
    title: '404',
    description: 'Not found.'
  },
  twitter: {
    title: '404',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Not found.'
  }
};

export default function NotFound() {
  return (
    <Container>
      <h1 className="mb-6 text-lg font-medium">404 &mdash; Not Found</h1>
      <section>
        <p className="mb-6">
          Been looking high and low, far and wide but couldn&apos;t find the page you&apos;re
          looking for. Maybe it&apos;s on vacation, or maybe it&apos;s just shy.
        </p>
        <p>Either way, apologies for the inconvenience.</p>
      </section>
      <span className="mt-6">
        <InlineLink href="/" ariaLabel="go to home page" arrowIcon className="p-1" hideUnderline>
          Back
        </InlineLink>
      </span>
    </Container>
  );
}
