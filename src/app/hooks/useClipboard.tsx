import { getErrorMessage } from '@/app/lib/utils';
import { useEffect, useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const resetCopied = () => {
      setIsCopied(false);
    };

    const timeout = setTimeout(resetCopied, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  const handleErrorMessage = (error: unknown) => {
    const errorMessage = getErrorMessage(error);
    setErrorMessage(errorMessage);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
    } catch (error) {
      handleErrorMessage(error);
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

  // Fallback function if clipboard api is not supported
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
