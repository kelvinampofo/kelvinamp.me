'use client';

import { Icon } from '@/app/components/ui/Icon';
import ShortcutKey from '@/app/components/ui/ShortcutKey';
import { useClipboard } from '@/app/hooks/useClipboard';
import useShortcut from '@/app/hooks/useShortcut';

import Tooltip from './Tooltip';

export default function CopyButton() {
  const { isCopied, isError, error, copyUrl } = useClipboard();

  useShortcut('c', copyUrl);

  return (
    <Tooltip
      content={
        <div className="flex items-center gap-2">
          Copy Link
          <ShortcutKey keyShortcuts="C" />
        </div>
      }
    >
      <button
        onMouseDown={copyUrl}
        className="rounded-full p-1 text-secondary dark:text-secondary-dark"
        aria-label="Copy Link"
      >
        {isError ? (
          error.message
        ) : isCopied ? (
          <>
            <div role="log" aria-live="polite" className="sr-only">
              Copied to clipboard
            </div>
            <p className="text-sm text-secondary dark:text-secondary-dark">Copied to clipboard</p>
          </>
        ) : (
          <Icon
            name="link"
            className="text-secondary transition-colors hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark"
            width={20}
            height={20}
            aria-hidden="true"
          />
        )}
      </button>
    </Tooltip>
  );
}
