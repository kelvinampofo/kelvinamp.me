import { parseError } from '@/app/lib/utils';
import { useEffect, useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ message: '' });

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyUrl = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setIsError(false);
        setError({ message: '' });
      } catch (error) {
        setError({ message: parseError(error) });
        setIsError(true);
        setIsCopied(false);
      }
    }
  };

  return {
    isCopied,
    isError,
    error,
    copyUrl
  };
}