import { parseError } from '@/app/lib/utils';
import { useEffect, useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ message: '' });
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsCopied(false), 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(location.href);
    }
  }, []);

  /**
   * clipboard copy text pattern
   * @see https://web.dev/patterns/clipboard/copy-text
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
    } catch (error) {
      setError({ message: parseError(error) });
      setIsError(true);
      setIsCopied(false);
    }
  };

  const createTmpElement = () => {
    const tmpElement = document.createElement('textarea');
    tmpElement.value = window.location.href;
    tmpElement.setAttribute('readonly', '');
    tmpElement.style.opacity = '0';
    document.body.appendChild(tmpElement);
    tmpElement.focus();
    tmpElement.select();
    return tmpElement;
  };

  const copyTextToClipboard = (tmpElement: HTMLTextAreaElement) => {
    try {
      tmpElement.select();
      document.execCommand('copy');
      setIsCopied(true);
    } catch (error) {
      setIsCopied(false);
      setIsError(true);
      setError({ message: parseError(error) });
    }
  };

  /**
   * fallback to clipboard api because safari (webkit) treats user activation differently:
   * @see https://bugs.webkit.org/show_bug.cgi?id=222262.
   */
  const handleFallbackCopy = () => {
    const tmpElement = createTmpElement();
    copyTextToClipboard(tmpElement);
    document.body.removeChild(tmpElement);
  };

  const handleCopyUrl = () => {
    navigator.clipboard ? handleCopy() : handleFallbackCopy();
  };

  return {
    isCopied,
    isError,
    error,
    copyUrl: handleCopyUrl
  };
}
