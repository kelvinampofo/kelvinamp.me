'use client';

import { useClipboard } from '@/app/hooks/useClipboard';
import { Icon } from './Icon';
import Tooltip from './Tooltip';

export default function CopyButton() {
  const { copyUrl, isCopied, isError, error } = useClipboard();

  return (
    <Tooltip content="Copy URL">
      <button onClick={copyUrl} className="px-1 text-secondary dark:text-secondary-dark">
        {isError ? (
          error.message
        ) : isCopied ? (
          <span>Link copied</span>
        ) : (
          <Icon
            name="link"
            className="text-secondary transition-colors hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark"
            width={18}
            height={18}
          />
        )}
      </button>
    </Tooltip>
  );
}
