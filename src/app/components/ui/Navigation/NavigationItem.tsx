import c from 'clsx';
import CustomLink from '../CustomLink';
import { Icon } from '../Icon';

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
    <CustomLink
      href={`/${route}/${item.slug}`}
      hideUnderline
      className={c(
        'p-1 hover:text-secondary dark:hover:text-secondary-dark',
        direction === 'next' && 'items-end'
      )}
    >
      <div className={`flex flex-col ${direction === 'next' ? 'items-end' : 'gap-1'}`}>
        <Icon
          name={direction === 'next' ? 'arrow-right' : 'arrow-left'}
          className={c('flex-1', direction === 'next' && 'text-[#6F6F6F] dark:text-[#A0A0A0]')}
          aria-hidden="true"
        />
        <span className="sr-only">
          {direction === 'next' ? 'Next' : 'Previous'}
          {route === 'writing' ? 'post,' : 'prototype,'}
        </span>
        {item.title}
      </div>
    </CustomLink>
  );
}
