import Separator from '@/app/components/generic/Separator';
import CustomLink from '@/app/components/ui/CustomLink';
import type { Prototype } from '@/app/lib/prototypes';
import { isWithin1Month } from '@/app/lib/utils';
import c from 'clsx';
import type { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Badge from './Badge';

interface ListProps {
  items: (Post | Prototype)[];
  route: string;
  showSummary?: boolean;
  showDate?: boolean;
}

export default function List({ items, route, showDate, showSummary }: ListProps) {
  return (
    <ol>
      {items
        .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
        .map(({ publishedAt, slug, title, summary }) => {
          const publishedDate = parseISO(publishedAt);
          const formattedDate = format(publishedDate, 'dd/MM/yy');
          const isNewItem = isWithin1Month(publishedDate);
          return (
            <li key={title}>
              <CustomLink
                href={`/${route}/${slug}`}
                hideUnderline
                className={c(
                  'flex justify-between gap-2 p-1',
                  showSummary && 'flex-col md:flex-row'
                )}
              >
                <div className="flex items-center font-medium">
                  <span>{title}</span>
                  {isNewItem && <Badge ariaHidden>new</Badge>}
                </div>
                {showDate && (
                  <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
                    {formattedDate}
                  </time>
                )}
                {showSummary && (
                  <span className="text-secondary dark:text-secondary-dark">{summary}</span>
                )}
              </CustomLink>
              <Separator className="my-3" />
            </li>
          );
        })}
    </ol>
  );
}
