'use client';

import { useClipboard } from '@/app/hooks/useClipboard';
import { useHotkey } from '@/app/hooks/useHotkey';
import { isMacOS } from '@/app/lib/utils';
import Text from '../generic/Text';
import { Icon } from './Icon';
import Tooltip from './Tooltip';

export default function CopyButton() {
  const { isCopied, isError, error, copyUrl } = useClipboard();

  useHotkey(isMacOS ? ['Control', 'Meta'] : ['Control', 'Alt'], 'c', copyUrl);

  return (
    <Tooltip content={`Copy Link (${isMacOS ? '⌃⌘C' : 'CTRL + ALT + C'})`}>
      <button
        onClick={copyUrl}
        className="px-1 text-secondary dark:text-secondary-dark"
        aria-label="Copy Link"
      >
        {isError ? (
          error.message
        ) : isCopied ? (
          <Text as="span" colour="secondary" size="small">
            Link copied!
          </Text>
        ) : (
          <Icon
            name="link"
            className="text-secondary transition-colors hover:text-primary dark:text-secondary-dark dark:hover:text-primary-dark"
            width={18}
            height={18}
            ariaHidden="true"
          />
        )}
      </button>
    </Tooltip>
  );
}
