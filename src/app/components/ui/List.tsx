import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CustomLink from '@/app/components/ui/CustomLink';
import type { Prototype } from '@/app/lib/data';
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
                className={c('flex justify-between gap-2', showSummary && 'flex-col md:flex-row')}
              >
                <div className="flex items-center font-medium">
                  <Text as="span" weight="medium">
                    {title}
                  </Text>
                  {isNewItem && <Badge ariaHidden>new</Badge>}
                </div>
                {showDate && (
                  <Text as="span" colour="secondary">
                    <time dateTime={publishedAt}>{formattedDate}</time>
                  </Text>
                )}
                {showSummary && (
                  <Text as="span" colour="secondary">
                    {summary}
                  </Text>
                )}
              </CustomLink>
              <Separator className="my-3" />
            </li>
          );
        })}
    </ol>
  );
}
