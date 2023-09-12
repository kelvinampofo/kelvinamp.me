import type { Prototype } from '@/app/data/prototypes';
import { isWithin1Month } from '@/app/lib/utils';
import type { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Separator from '../generic/Separator';
import CustomLink from './CustomLink';

interface ListProps {
  items: (Post | Prototype)[];
  route: string;
}

export default function List({ items, route }: ListProps) {
  return (
    <>
      {items
        .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
        .map(({ publishedAt, slug, title }) => {
          const publishedDate = parseISO(publishedAt);

          const isNewContent = isWithin1Month(publishedDate);

          const formattedDate = format(publishedDate, 'dd/MM/yy');

          return (
            <ol key={title}>
              <li>
                <CustomLink
                  href={`/${route}/${slug}`}
                  hideUnderline
                  className="flex justify-between"
                >
                  <span className="flex font-medium">
                    {title}
                    {isNewContent && (
                      <span className="ml-2 animate-shine items-baseline bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 bg-200 bg-clip-text bg-left text-xs text-transparent dark:from-teal-200 dark:via-blue-600 dark:to-teal-200">
                        new
                      </span>
                    )}
                  </span>
                  <time className="text-[#6F6F6F] dark:text-neutral-400">{formattedDate}</time>
                </CustomLink>
              </li>
              <Separator className="my-3" />
            </ol>
          );
        })}
    </>
  );
}
