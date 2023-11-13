'use client';

import { useClipboard } from '@/app/hooks/useClipboard';
import { Icon } from './Icon';
import Tooltip from './Tooltip';

export default function CopyButton() {
  const { isCopied, errorMessage, handleCopyUrl } = useClipboard();

  return (
    <Tooltip content="Copy URL">
      <button
        onClick={handleCopyUrl}
        aria-label={errorMessage ? errorMessage : isCopied ? 'Link copied' : 'Copy URL'}
        className="px-1 text-secondary dark:text-secondary-dark"
      >
        {errorMessage ? (
          errorMessage
        ) : isCopied ? (
          <span>Link copied!</span>
        ) : (
          <Icon
            name="link"
            className="text-secondary transition-colors hover:text-secondary dark:text-secondary-dark dark:hover:text-secondary-dark"
            aria-label="Copy icon"
            width={18}
            height={18}
          />
        )}
      </button>
    </Tooltip>
  );
}
