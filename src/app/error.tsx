'use client';

import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import { Icon } from '@/app/components/ui/Icon';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const isDevelopmentMode = process.env.NODE_ENV === 'development';

  return (
    <Container>
      <Heading className="mb-6 text-lg font-medium">Oops, something went wrong...</Heading>
      <div className="flex flex-col items-start gap-3">
        <p>Very much sad, very high priority. Maybe refresh?</p>
        <button
          onClick={reset}
          className="rounded-md border bg-neutral-50 p-1 shadow-sm dark:border-neutral-800 dark:bg-[#1C1C1C]"
        >
          Refresh
          <Icon
            name="reload"
            height={15}
            width={15}
            className="mx-1 inline-flex items-center text-secondary"
          />
        </button>
        <details className="dark:border-neutral-800 [&_svg]:open:rotate-90">
          <summary className="mb-3 flex cursor-pointer list-none items-center gap-1">
            <div>
              <Icon
                name="chevron-right"
                className="rotate-[15] transition-all duration-300 dark:text-secondary-dark"
              />
            </div>
            <div>Stats for nerds</div>
            <Icon name="rocket" className="mx-1 text-secondary" />
          </summary>
          <div className="flex flex-col gap-1">
            <p>
              <strong>Name:</strong> {error.name}
            </p>
            <p>
              <strong>Message:</strong> {error.message}
            </p>
            {isDevelopmentMode && (
              <p>
                <strong>Stack:</strong> {error.stack}
              </p>
            )}
          </div>
        </details>
      </div>
    </Container>
  );
}
