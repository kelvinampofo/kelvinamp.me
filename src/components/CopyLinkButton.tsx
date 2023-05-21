'use client';

import { Link2Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import Tooltip from './Tooltip';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

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

  // below code follows similar pattern from https://web.dev/patterns/clipboard/copy-text/
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy URL to clipboard: ', error);
      // todo: show error feedback to the user
    }
  };

  // fallback function if clipboard api is not supported
  const handleFallbackCopy = () => {
    const tmpElement = document.createElement('textarea');
    tmpElement.value = window.location.href;
    tmpElement.setAttribute('readonly', '');
    tmpElement.style.opacity = '0';
    document.body.appendChild(tmpElement);
    tmpElement.focus();
    tmpElement.select();

    try {
      document.execCommand('copy');
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy URL to clipboard: ', error);
    } finally {
      document.body.removeChild(tmpElement);
    }
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
        aria-label={copied ? 'Copied URL' : 'Copy URL'}
      >
        {copied ? (
          'Copied URL!'
        ) : (
          <Link2Icon
            className="mx-2 text-[#6F6F6F] duration-200 ease-linear hover:text-[#6F6F6F] dark:text-neutral-400 dark:hover:text-[#EDEDED]"
            width={18}
            height={18}
          />
        )}
      </button>
    </Tooltip>
  );
}
