import Separator from '@/app/components/generic/Separator';
import CustomLink from '@/app/components/ui/CustomLink';
import type { Prototype } from '@/app/lib/prototypes';
import { isWithin1Month } from '@/app/lib/utils';
import c from 'clsx';
import type { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Text from '../generic/Text';
import Badge from './Badge';

interface ListProps {
  items: Post[] | Prototype[];
  route: string;
}

export default function List({ items, route }: ListProps) {
  const craftRoute = 'craft';

  return (
    <>
      <Separator className="my-3" />
      <ol>
        {items
          .sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
          .map(({ publishedAt, slug, title, summary }) => {
            const publishedDate = parseISO(publishedAt);
            const isNewItem = isWithin1Month(publishedDate);
            return (
              <li key={title}>
                <CustomLink
                  href={`/${route}/${slug}`}
                  hideUnderline
                  className={c('flex justify-between gap-2 p-1')}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <span>{title}</span>
                    {route === craftRoute && (
                      <Text
                        as="span"
                        colour="secondary"
                        className="hidden md:block"
                        size="small"
                        aria-hidden="true"
                      >
                        {summary}
                      </Text>
                    )}
                    {isNewItem && <Badge ariaHidden>new</Badge>}
                  </div>

                  <time dateTime={publishedAt} className="text-secondary dark:text-secondary-dark">
                    {route === craftRoute
                      ? format(publishedDate, 'MMM yyyy')
                      : format(publishedDate, 'dd/MM/yy')}
                  </time>
                </CustomLink>
                <Separator className="my-3" />
              </li>
            );
          })}
      </ol>
    </>
  );
}
