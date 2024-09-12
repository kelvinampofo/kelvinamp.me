import { parseError } from '@/app/lib/utils';
import { useCallback, useEffect, useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ message: '' });

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.write) {
        const mimeType = 'text/plain';

        const clipboardItem = new ClipboardItem({
          mimeType: new Promise(async (resolve) => {
            try {
              const copyText = currentUrl || ''; // fallback to empty string if currentUrl is falsy

              // if the result is valid, resolve with a Blob containing the text
              resolve(new Blob([copyText], { type: mimeType }));
            } catch (error) {
              resolve(new Blob([''], { type: mimeType }));
            }
          })
        });

        await navigator.clipboard.write([clipboardItem]);
      } else {
        // fallback for browsers that don't support clipboard.write
        await navigator.clipboard.writeText(currentUrl);
      }
      setIsCopied(true);
      setIsError(false);
      setError({ message: '' });
    } catch (error) {
      setError({ message: parseError(error) });
      setIsError(true);
      setIsCopied(false);
    }
  }, [currentUrl]);

  return {
    isCopied,
    isError,
    error,
    copyUrl: handleCopy
  };
}
