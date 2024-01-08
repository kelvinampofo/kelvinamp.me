import CustomLink from '@/app/components/ui/CustomLink';
import React from 'react';
import { Icon } from './Icon';

type Item = {
  title: string;
  slug: string;
  publishedAt: string;
};

interface NavigationProps {
  currentItem: Item;
  allItems: Item[];
  route: string;
}

function findNextItem(currentItem: Item, allItems: Item[]) {
  const currentItemDate = new Date(currentItem.publishedAt);

  const nextItems = allItems
    .filter((item) => new Date(item.publishedAt) > currentItemDate)
    .sort((a, b) => Number(new Date(a.publishedAt)) - Number(new Date(b.publishedAt)));

  return nextItems[0];
}

function findPreviousItem(currentItem: Item, allItems: Item[]) {
  const currentItemDate = new Date(currentItem.publishedAt);

  const previousItems = allItems
    .filter((item) => new Date(item.publishedAt) < currentItemDate)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));

  return previousItems[0];
}

export function Navigation({ currentItem, allItems, route }: NavigationProps) {
  const nextItem = findNextItem(currentItem, allItems);
  const previousItem = findPreviousItem(currentItem, allItems);

  return (
    <nav className="flex list-none justify-between text-sm">
      {previousItem && (
        <CustomLink
          href={`/${route}/${previousItem.slug}`}
          hideUnderline
          className="p-1 hover:text-secondary dark:hover:text-secondary-dark"
        >
          <div className="flex flex-col gap-1">
            <Icon
              name="arrow-left"
              className="text-secondary dark:text-secondary-dark"
              aria-hidden="true"
            />
            <span className="sr-only">
              Previous {`${route === 'writing' ? 'post,' : 'prototype,'}`}
            </span>
            {previousItem.title}
          </div>
        </CustomLink>
      )}
      <div className="flex grow" /> {/* fill remaining space */}
      {nextItem && (
        <CustomLink
          href={`/${route}/${nextItem.slug}`}
          hideUnderline
          className="p-1 hover:text-secondary dark:hover:text-secondary-dark"
        >
          <div className="flex flex-col items-end gap-1">
            <Icon
              name="arrow-right"
              className="flex-1 text-[#6F6F6F] dark:text-[#A0A0A0]"
              aria-hidden="true"
            />
            <span className="sr-only">
              Next {`${route === 'writing' ? 'post,' : 'prototype,'}`}
            </span>
            {nextItem.title}
          </div>
        </CustomLink>
      )}
    </nav>
  );
}
