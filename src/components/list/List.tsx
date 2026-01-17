import { format, isAfter, subMonths, parseISO, isThisYear } from "date-fns";
import Link from "next/link";

import Badge from "../badge/Badge";

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
}

export default function List({
  items,
  basePath,
  showDescription = false,
}: ListProps) {
  function getDisplayDate(dateString: string) {
    const date = parseISO(dateString);
    const formatString = basePath.includes("writing")
      ? isThisYear(date)
        ? "dd MMM"
        : "dd MMM yyyy"
      : isThisYear(date)
        ? "MMMM"
        : "MMMM yyyy";

    return format(date, formatString);
  }

  return (
    <ol data-list="unstyled">
      {items.map(({ id, slug, title, publishedDate, description }, index) => {
        const isNew = isAfter(
          parseISO(publishedDate),
          subMonths(new Date(), 1)
        );

        return (
          <li key={id} className={styles.listItem}>
            <Link href={{ pathname: `${basePath}/${slug}` }}>
              <div className={styles.titleRow}>
                <p>{title}</p>
                {showDescription && (
                  <span className={styles.description}>{description}</span>
                )}
                {isNew && <Badge>new</Badge>}
              </div>
              <span className={styles.postDate}>
                {getDisplayDate(publishedDate)}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
