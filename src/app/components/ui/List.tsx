import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CustomLink from '@/app/components/ui/CustomLink';
import type { Prototype } from '@/app/lib/data';
import { isWithin1Month } from '@/app/lib/utils';
import c from 'clsx';
import type { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

interface ListProps {
  items: (Post | Prototype)[];
  route: string;
  showSummary?: boolean;
  showDate?: boolean;
}

export default function List({ items, route, showDate, showSummary }: ListProps) {
  return (
    <>
      {items
        .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
        .map(({ publishedAt, slug, title, summary }) => {
          const publishedDate = parseISO(publishedAt);

          const isNewContent = isWithin1Month(publishedDate);

          const formattedDate = format(publishedDate, 'dd/MM/yy');

          return (
            <ol key={title}>
              <li>
                <CustomLink
                  href={`/${route}/${slug}`}
                  hideUnderline
                  className={c('flex justify-between gap-2', showSummary && 'flex-col md:flex-row')}
                >
                  <span className="flex items-center font-medium">
                    {title}
                    {isNewContent && (
                      <span className="ml-2 animate-shine bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 bg-200 bg-clip-text bg-left text-xs text-transparent dark:from-teal-200 dark:via-blue-600 dark:to-teal-200">
                        new
                      </span>
                    )}
                  </span>
                  {showDate && (
                    <Text as="span" colour="secondary">
                      {formattedDate}
                    </Text>
                  )}
                  {showSummary && (
                    <Text as="span" colour="secondary">
                      {summary}
                    </Text>
                  )}
                </CustomLink>
              </li>
              <Separator className="my-3" />
            </ol>
          );
        })}
    </>
  );
}
