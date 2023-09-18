'use client';

import { getErrorMessage } from '@/app/lib/utils';
import { Link2Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Tooltip from './Tooltip';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const resetCopied = () => {
      setCopied(false);
    };

    const timeout = setTimeout(resetCopied, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleErrorMessage = (error: unknown) => {
    const errorMessage = getErrorMessage(error);
    setErrorMessage(errorMessage);
  };

  // clipboard pattern adapted from https://web.dev/patterns/clipboard/copy-text/
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
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
      setCopied(true);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  // fallback if clipboard api is not supported
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

  return (
    <Tooltip content="Copy URL">
      <button
        onClick={handleCopyUrl}
        aria-label={errorMessage ? errorMessage : copied ? 'Link copied' : 'Copy URL'}
      >
        {errorMessage ? (
          errorMessage
        ) : copied ? (
          'Link copied'
        ) : (
          <Link2Icon
            className="text-[#6F6F6F] duration-200 ease-linear hover:text-[#6F6F6F] dark:text-[#A0A0A0] dark:hover:text-[#EDEDED]"
            width={18}
            height={18}
            aria-label="Link icon"
          />
        )}
      </button>
    </Tooltip>
  );
}
