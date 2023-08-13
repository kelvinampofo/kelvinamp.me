import type { Project } from '@/app/data/data';
import { isWithin2Months } from '@/app/lib/utils';
import type { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { Fragment } from 'react';
import Separator from '../generic/Separator';
import CustomLink from './CustomLink';

interface ContentListProps {
  items: Project[] | Post[];
}

export default function List({ items }: ContentListProps) {
  return (
    <>
      {items
        .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
        .map((content) => {
          const publishedDate = parseISO(content.publishedAt);

          const isNewContent = isWithin2Months(publishedDate);
          return (
            <Fragment key={content._id}>
              <CustomLink href={content.slug}>
                <div className="flex justify-between">
                  <span className="flex font-medium">
                    {content.title}
                    {isNewContent && (
                      <span className="ml-2 animate-shine items-baseline bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 bg-200 bg-clip-text bg-left text-xs text-transparent dark:from-teal-200 dark:via-blue-600 dark:to-teal-200">
                        new
                      </span>
                    )}
                  </span>
                  <time className="text-[#6F6F6F] dark:text-neutral-400">
                    {format(publishedDate, 'dd/MM/yy')}
                  </time>
                </div>
              </CustomLink>
              <Separator className="my-3" />
            </Fragment>
          );
        })}
    </>
  );
}
