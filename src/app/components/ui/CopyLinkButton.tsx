'use client';

import { useClipboard } from '@/app/hooks/useClipboard';
import { Link2Icon } from '@radix-ui/react-icons';
import Tooltip from './Tooltip';

export default function CopyLinkButton() {
  const { isCopied, errorMessage, handleCopyUrl } = useClipboard();

  return (
    <Tooltip content="Copy URL">
      <button
        onClick={handleCopyUrl}
        aria-label={errorMessage ? errorMessage : isCopied ? 'Link copied' : 'Copy URL'}
      >
        {errorMessage ? (
          errorMessage
        ) : isCopied ? (
          'Link copied'
        ) : (
          <Link2Icon
            className="text-secondary transition-colors hover:text-secondary dark:text-secondary-dark dark:hover:text-secondary-dark"
            width={18}
            height={18}
            aria-label="Link icon"
          />
        )}
      </button>
    </Tooltip>
  );
}
