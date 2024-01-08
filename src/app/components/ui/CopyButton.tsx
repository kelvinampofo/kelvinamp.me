'use client';

import { useClipboard } from '@/app/hooks/useClipboard';
import { useShortcut } from '@/app/hooks/useShortcut';
import { isMacOS } from '@/app/lib/utils';
import Text from '../generic/Text';
import { Icon } from './Icon';
import ShortcutKey from './ShortcutKey';
import Tooltip from './Tooltip';

export default function CopyButton() {
  const { isCopied, isError, error, copyUrl } = useClipboard();

  useShortcut(isMacOS ? ['Control', 'Meta'] : ['Control', 'Alt'], 'c', copyUrl);

  return (
    <Tooltip
      content={
        <div className="flex items-center gap-1">
          Copy Link
          <ShortcutKey keyShortcuts={isMacOS ? ['⌃', '⌘', 'C'] : ['CTRL', 'ALT', 'C']} />
        </div>
      }
    >
      <button
        onClick={copyUrl}
        className="px-1 text-secondary dark:text-secondary-dark"
        aria-label="Copy Link"
      >
        {isError ? (
          error.message
        ) : isCopied ? (
          <>
            <div role="log" aria-live="polite" className="sr-only">
              Link copied to clipboard
            </div>
            <Text as="span" colour="secondary" size="small">
              Link copied!
            </Text>
          </>
        ) : (
          <Icon
            name="link"
            className="text-secondary transition-colors hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark"
            width={18}
            height={18}
            aria-hidden="true"
          />
        )}
      </button>
    </Tooltip>
  );
}
