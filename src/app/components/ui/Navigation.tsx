import CustomLink from '@/app/components/ui/CustomLink';
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

type Item = {
  title: string;
  slug: string;
  publishedAt: string;
};

interface NavigationProps {
  currentItem: Item;
  allItems: Item[];
  pathPrefix: string;
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

export function Navigation({ currentItem, allItems, pathPrefix }: NavigationProps) {
  const nextItem = findNextItem(currentItem, allItems);
  const previousItem = findPreviousItem(currentItem, allItems);

  return (
    <nav className="flex list-none justify-between text-sm">
      {previousItem && (
        <CustomLink
          href={`/${pathPrefix}/${previousItem.slug}`}
          ariaLabel="Previous post"
          hideUnderline
        >
          <div className="flex flex-col gap-1">
            <ArrowLeftIcon className="text-[#6F6F6F] dark:text-[#A0A0A0]" />
            {previousItem.title}
            <span className="sr-only">Previous</span>
          </div>
        </CustomLink>
      )}
      <div className="flex grow" /> {/* fill remaining space */}
      {nextItem && (
        <CustomLink href={`/${pathPrefix}/${nextItem.slug}`} ariaLabel="Next post" hideUnderline>
          <div className="flex flex-col items-end gap-1">
            <ArrowRightIcon className="flex-1 text-[#6F6F6F] dark:text-[#A0A0A0]" />
            {nextItem.title}
            <span className="sr-only">Next</span>
          </div>
        </CustomLink>
      )}
    </nav>
  );
}
