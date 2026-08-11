import Link from "next/link";

import type {
  ContentCollection,
  ContentEntry,
} from "../../content/collection";
import { formatDate, isAfter, isThisYear, subMonths } from "../../utils/date";
import Badge from "../badge/Badge";

import styles from "./List.module.css";

// keep render output deterministic for the lifetime of this module - these
// lists are statically generated, so this is effectively the build timestamp
const REFERENCE_DATE = new Date();
const NEW_CONTENT_CUTOFF = subMonths(REFERENCE_DATE, 1);

interface ListProps {
  entries: readonly ContentEntry[];
  collection: ContentCollection;
  showDescriptions?: boolean;
  dateFormat: Intl.DateTimeFormatOptions;
}

export default function List({
  entries,
  collection,
  showDescriptions = false,
  dateFormat,
}: ListProps) {
  return (
    <ol data-list="unstyled">
      {entries.map(({ id, slug, title, publishedDate, description }) => {
        const isNew = isAfter(publishedDate, NEW_CONTENT_CUTOFF);

        const pathname = `/${collection}/${slug}`;

        return (
          <li key={id} className={styles.item}>
            <Link href={{ pathname }}>
              <div className={styles.summary}>
                <p>{title}</p>
                {showDescriptions && description && (
                  <span className={styles.description}>{description}</span>
                )}
                {isNew && <Badge>new</Badge>}
              </div>
              <span className={styles.date}>
                {formatDate(publishedDate, {
                  ...dateFormat,
                  year: isThisYear(publishedDate, REFERENCE_DATE)
                    ? undefined
                    : "numeric",
                })}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
