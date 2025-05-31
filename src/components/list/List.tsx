import { format, isAfter, subMonths, parseISO, isThisYear } from "date-fns";
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
  description?: string;
}

interface ListProps {
  items: ListItem[];
  basePath: string;
  showDescription?: boolean;
  dateFormat?: string;
}

export default function List({
  items,
  basePath,
  showDescription = false,
  dateFormat = "dd/MM/yy",
}: ListProps) {
  function getDisplayDate(dateString: string, dateFormat: string) {
    const date = parseISO(dateString);
    const formatString = isThisYear(dateString)
      ? dateFormat === "MMMM yyyy"
        ? "MMMM"
        : "dd/MM"
      : dateFormat;

    return format(date, formatString);
  }

  return (
    <ol>
      {items.map(({ id, slug, title, publishedDate, description }, index) => {
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
                  {showDescription && (
                    <span className={styles.description}>{description}</span>
                  )}
                  {isNew && <Badge>new</Badge>}
                </span>
                <span className={styles.postDate}>
                  {getDisplayDate(publishedDate, dateFormat)}
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
