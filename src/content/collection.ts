import { cache } from "react";
import type { ComponentType } from "react";

interface ContentEntryMetadata {
  title: string;
  publishedDate: string;
  description?: string;
}

interface ContentEntryModule {
  default: ComponentType;
  metadata: ContentEntryMetadata;
}

export interface ContentEntry extends ContentEntryMetadata {
  slug: string;
}

const CONTENT_MODULES = {
  craft: import.meta.glob<ContentEntryModule>("./craft/*/index.tsx"),
  writing: import.meta.glob<ContentEntryModule>("./writing/*/index.tsx"),
};

export type ContentCollection = keyof typeof CONTENT_MODULES;

export const getContentEntries = cache(
  async (collection: ContentCollection): Promise<readonly ContentEntry[]> => {
    const entries = await Promise.all(
      Object.entries(CONTENT_MODULES[collection]).map(
        async ([path, loadModule]): Promise<ContentEntry> => {
          const { metadata } = await loadModule();
          const slug = getSlugFromPath(path);

          return { slug, ...metadata };
        }
      )
    );

    return sortEntries(entries);
  }
);

export const getContentEntryModule = cache(
  async (
    collection: ContentCollection,
    slug: string
  ): Promise<ContentEntryModule | null> => {
    const loadModule =
      CONTENT_MODULES[collection][`./${collection}/${slug}/index.tsx`];

    return loadModule ? loadModule() : null;
  }
);

function sortEntries(entries: readonly ContentEntry[]) {
  return entries.toSorted((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate)
  );
}

function getSlugFromPath(path: string) {
  const match = path.match(/\/([^/]+)\/index\.tsx$/);

  if (!match) {
    throw new Error(`Could not derive a content slug from ${path}.`);
  }

  return match[1];
}
