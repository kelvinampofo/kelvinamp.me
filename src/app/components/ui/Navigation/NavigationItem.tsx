import c from 'clsx';
import { Icon } from '../Icon';
import InlineLink from '../InlineLink';

export type Item = {
  title: string;
  slug: string;
  publishedAt: string;
};

type NavigationItemProps = {
  item: Item;
  route: string;
  direction: 'next' | 'previous';
};

export default function NavigationItem({ item, route, direction }: NavigationItemProps) {
  return (
    <InlineLink
      href={`/${route}/${item.slug}`}
      hideUnderline
      className={c(
        'p-1 hover:text-secondary dark:hover:text-secondary-dark',
        direction === 'next' && 'items-end'
      )}
    >
      <div className={c('flex flex-col gap-1', direction === 'next' && 'items-end')}>
        <Icon name={direction === 'next' ? 'arrow-right' : 'arrow-left'} aria-hidden="true" />
        <span className="sr-only">
          {direction === 'next' ? 'Next' : 'Previous'}
          {route === 'writing' ? 'post,' : 'prototype,'}
        </span>
        {item.title}
      </div>
    </InlineLink>
  );
}
