'use client';

import { useClipboard } from '@/app/hooks/useClipboard';
import { useHotKey } from '@/app/hooks/useHotkey';
import Text from '../generic/Text';
import { Icon } from './Icon';
import Tooltip from './Tooltip';

export default function CopyButton() {
  const { isCopied, isError, error, copyUrl } = useClipboard();

  useHotKey(['Control', 'Shift'], 'c', copyUrl);

  return (
    <Tooltip content="Copy URL">
      <button onClick={copyUrl} className="px-1 text-secondary dark:text-secondary-dark">
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
          />
        )}
      </button>
    </Tooltip>
  );
}
