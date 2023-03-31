'use client';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service.
    console.error(error);
  }, [error]);

  return (
    <div>
      <p className="mt-44">
        Oops, something went wrong... very much sad. Maybe refresh?
      </p>
    </div>
  );
}
