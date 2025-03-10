import React from 'react';

import NavigationItem, { type Item } from './NavigationItem';

interface NavigationProps {
  currentItem: Item;
  allItems: Item[];
  route: string;
}

export default function Navigation({ currentItem, allItems, route }: NavigationProps) {
  const nextItem = findNextItem(currentItem, allItems);
  const previousItem = findPreviousItem(currentItem, allItems);

  return (
    <nav className="flex justify-between text-sm">
      {previousItem && <NavigationItem item={previousItem} route={route} direction="previous" />}
      <div className="flex grow" /> {/* fill remaining space */}
      {nextItem && <NavigationItem item={nextItem} route={route} direction="next" />}
    </nav>
  );
}

function findNextItem(currentItem: Item, allItems: Item[]) {
  const currentItemDate = new Date(currentItem.publishedAt);

  const nextItems = allItems
    .filter(({ publishedAt }) => new Date(publishedAt) > currentItemDate)
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());

  return nextItems[0];
}

function findPreviousItem(currentItem: Item, allItems: Item[]) {
  const currentItemDate = new Date(currentItem.publishedAt);

  const previousItems = allItems
    .filter(({ publishedAt }) => new Date(publishedAt) < currentItemDate)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return previousItems[0];
}
