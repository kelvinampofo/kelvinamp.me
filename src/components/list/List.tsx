import { format, isAfter, subMonths, parseISO, isThisYear } from "date-fns";
import Link from "next/link";

import type {
  ContentCollection,
  ContentEntry,
} from "../../utils/content-collection";
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
        const isNew = isAfter(
          parseISO(publishedDate),
          subMonths(new Date(), 1)
        );

        const pathname = `/${collection}/${slug}`;

        return (
          <li key={id} className={styles.listItem}>
            <Link href={{ pathname }}>
              <div className={styles.titleRow}>
                <p>{title}</p>
                {showDescription && description && (
                  <span className={styles.description}>{description}</span>
                )}
                {isNew && <Badge>new</Badge>}
              </div>
              <span className={styles.postDate}>
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
  const date = parseISO(dateString);

  if (collection === "writing") {
    return format(date, isThisYear(date) ? "dd MMM" : "dd MMM yyyy");
  }

  return format(date, isThisYear(date) ? "MMMM" : "MMMM yyyy");
}
