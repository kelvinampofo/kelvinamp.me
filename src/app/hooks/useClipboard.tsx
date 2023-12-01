import { getErrorMessage } from '@/app/lib/utils';
import { useEffect, useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const resetCopied = () => {
      setIsCopied(false);
    };

    const timeout = setTimeout(resetCopied, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(location.href);
    }
  }, []);

  const handleErrorMessage = (error: unknown) => {
    const errorMessage = getErrorMessage(error);
    setErrorMessage(errorMessage);
  };

  /**
   * clipboard copy text pattern
   * @see https://web.dev/patterns/clipboard/copy-text
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
    } catch (error) {
      handleErrorMessage(error);
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
      handleErrorMessage(error);
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
    if (navigator.clipboard) {
      handleCopy();
    } else {
      handleFallbackCopy();
    }
  };

  return {
    isCopied,
    errorMessage,
    handleCopyUrl
  };
}
