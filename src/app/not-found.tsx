import Container from '@/components/Container';
import { Metadata } from 'next';

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
    </Container>
  );
}
