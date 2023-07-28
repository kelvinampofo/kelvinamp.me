'use client';

import Container from '@/app/components/Container';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  console.error(error);

  return (
    <Container>
      <h1 className="mb-6 text-lg font-medium">Oops something went wrong...</h1>
      <p>Very much sad, very high priority. Maybe refresh?</p>
    </Container>
  );
}
