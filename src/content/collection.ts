import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";

export interface ContentEntryMetadata {
  title: string;
  publishedDate: string;
  description?: string;
}

interface ContentMetadataModule {
  metadata: ContentEntryMetadata;
}

export interface ContentEntry extends ContentEntryMetadata {
  slug: string;
}

const CONTENT_METADATA = {
  craft: import.meta.glob<ContentMetadataModule>("./craft/*/metadata.ts"),
  writing: import.meta.glob<ContentMetadataModule>("./writing/*/metadata.ts"),
};

export type ContentCollection = keyof typeof CONTENT_METADATA;

export const getContentEntries = cache(
  async (collection: ContentCollection): Promise<readonly ContentEntry[]> => {
    const entries = await Promise.all(
      Object.entries(CONTENT_METADATA[collection]).map(
        async ([path, loadModule]): Promise<ContentEntry> => {
          const { metadata } = await loadModule();
          const slug = slugFromPath(path);

          return { slug, ...metadata };
        }
      )
    );

    return sortByNewest(entries);
  }
);

export async function getContentEntry(
  collection: ContentCollection,
  slug: string
) {
  const entries = await getContentEntries(collection);
  const entry = entries.find((entry) => entry.slug === slug);

  if (!entry) notFound();

  return entry;
}

export function sortByNewest<T extends { publishedDate: string }>(
  items: readonly T[]
) {
  return items.toSorted((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate)
  );
}

function slugFromPath(path: string) {
  const slug = path.match(/\/([^/]+)\/metadata\.ts$/)?.[1];

  if (!slug) {
    throw new Error(`Could not derive a content slug from ${path}.`);
  }

  return slug;
}
