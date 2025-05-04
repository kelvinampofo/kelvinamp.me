import { format, isAfter, subMonths, parseISO } from "date-fns";
import Link from "next/link";
import { Fragment } from "react";

import Badge from "../badge/Badge";
import Separator from "../separator/Separator";

import styles from "./List.module.css";

interface ListItem {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
  summary?: string;
}

interface ListProps {
  items: ListItem[];
  basePath: string;
  showSummary?: boolean;
  dateFormat?: string;
}

export default function List({
  items,
  basePath,
  showSummary = false,
  dateFormat = "dd/MM/yy",
}: ListProps) {
  return (
    <ol>
      {items.map(({ id, slug, title, publishedDate, summary }, index) => {
        const isNew = isAfter(
          parseISO(publishedDate),
          subMonths(new Date(), 1)
        );

        return (
          <Fragment key={id}>
            <li>
              <Link
                href={`${basePath}/${slug}`}
                className={styles.listItemLink}
              >
                <span className={styles.titleRow}>
                  <p>{title}</p>
                  {showSummary && (
                    <span className={styles.summary}>{summary}</span>
                  )}
                  {isNew && <Badge>new</Badge>}
                </span>
                <span className={styles.postDate}>
                  {format(new Date(publishedDate), dateFormat)}
                </span>
              </Link>
            </li>
            {index < items.length - 1 && (
              <Separator className={styles.listSeparator} />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
