import Link from "next/link";

import type {
  ContentCollection,
  ContentEntry,
} from "../../utils/content-collection";
import { formatDate, isAfter, isThisYear, subMonths } from "../../utils/date";
import Badge from "../badge/Badge";

import styles from "./List.module.css";

interface ListProps {
  entries: readonly ContentEntry[];
  collection: ContentCollection;
}

export default function List({ entries, collection }: ListProps) {
  const showDescription = collection === "craft";

  return (
    <ol data-list="unstyled">
      {entries.map(({ id, slug, title, publishedDate, description }) => {
        const isNew = isAfter(publishedDate, subMonths(new Date(), 1));

        const pathname = `/${collection}/${slug}`;

        return (
          <li key={id} className={styles.item}>
            <Link href={{ pathname }}>
              <div className={styles.summary}>
                <p>{title}</p>
                {showDescription && description && (
                  <span className={styles.description}>{description}</span>
                )}
                {isNew && <Badge>new</Badge>}
              </div>
              <span className={styles.date}>
                {getDisplayDate(publishedDate, collection)}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function getDisplayDate(dateString: string, collection: ContentCollection) {
  const withYear = !isThisYear(dateString);

  if (collection === "writing") {
    return formatDate(dateString, {
      day: "2-digit",
      month: "short",
      year: withYear ? "numeric" : undefined,
    });
  }

  return formatDate(dateString, {
    month: "long",
    year: withYear ? "numeric" : undefined,
  });
}
