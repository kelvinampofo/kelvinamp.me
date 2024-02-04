import Separator from '@/app/components/generic/Separator';
import Badge from '@/app/components/ui/Badge';
import CustomLink from '@/app/components/ui/CustomLink';
import type { Prototype } from '@/app/lib/prototypes';
import { isWithin1Month } from '@/app/lib/utils';
import type { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

interface ListProps {
  items: Post[] | Prototype[];
  route: string;
}

export default function List({ items, route }: ListProps) {
  const isCraftRoute = route === 'craft';

  return (
    <>
      <ol>
        {items
          .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
          .map(({ publishedAt, slug, title }, index) => {
            const publishedDate = parseISO(publishedAt);
            const isNewItem = isWithin1Month(publishedDate);
            return (
              <li key={title}>
                <CustomLink
                  href={`/${route}/${slug}`}
                  hideUnderline
                  className="flex justify-between gap-2 p-1 hover:text-secondary dark:hover:text-secondary-dark"
                >
                  <div className="flex items-center gap-2">
                    <span>{title}</span>
                    {isNewItem && <Badge ariaHidden>new</Badge>}
                  </div>
                  <time
                    dateTime={publishedAt}
                    className="text-sm text-secondary dark:text-secondary-dark"
                  >
                    {isCraftRoute
                      ? format(publishedDate, 'MMMM yyyy')
                      : format(publishedDate, 'dd/MM/yy')}
                  </time>
                </CustomLink>
                {index !== items.length - 1 && <Separator className="my-3" />}
              </li>
            );
          })}
      </ol>
    </>
  );
}
