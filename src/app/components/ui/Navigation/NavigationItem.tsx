import c from 'clsx';
import InlineLink from '../InlineLink';

export interface Item {
  title: string;
  slug: string;
  publishedAt: string;
}

interface NavigationItemProps {
  item: Item;
  route: string;
  direction: 'next' | 'previous';
}

export default function NavigationItem({ item, route, direction }: NavigationItemProps) {
  return (
    <InlineLink
      href={`/${route}/${item.slug}`}
      hideUnderline
      className="p-1 hover:text-secondary dark:hover:text-secondary-dark"
    >
      <div className={c('flex flex-col gap-1', { 'items-end': direction === 'next' })}>
        <span className="text-secondary dark:text-secondary-dark">
          {direction === 'previous' ? 'Previous' : 'Next'}
        </span>
        <span className="sr-only">{route === 'writing' ? 'post,' : 'prototype,'}</span>
        <span>{item.title}</span>
      </div>
    </InlineLink>
  );
}
