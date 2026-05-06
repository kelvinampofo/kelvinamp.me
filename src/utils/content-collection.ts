import { readdir } from "fs/promises";

import { cache } from "react";
import type { ComponentType } from "react";

export type ContentCollection = "craft" | "writing";

export interface ContentEntryMetadata {
  title: string;
  publishedDate: string;
  description?: string;
}

export interface ContentEntry extends ContentEntryMetadata {
  id: string;
  slug: string;
}

export interface ContentEntryModule {
  default: ComponentType;
  metadata: ContentEntryMetadata;
}

const CONTENT_ROOTS = {
  craft: "./src/content/craft",
  writing: "./src/content/writing",
} satisfies Record<ContentCollection, string>;

export const getContentEntries = cache(
  async (collection: ContentCollection): Promise<ContentEntry[]> => {
    const files = await readdir(CONTENT_ROOTS[collection], {
      withFileTypes: true,
    });

    const entries = await Promise.all(
      files
        .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
        .map(async (file): Promise<ContentEntry> => {
          const slug = file.name.replace(/\.tsx$/, "");
          const { metadata } = await importContentEntryModule(collection, slug);

          return {
            id: slug,
            slug,
            ...metadata,
          };
        })
    );

    return sortEntries(entries);
  }
);

export const getContentEntryModule = cache(
  async (
    collection: ContentCollection,
    slug: string
  ): Promise<ContentEntryModule | null> => {
    // Check the index first so only unknown slugs return null. If a known
    // entry fails to import, let the error through so the broken file is fixed.
    const entries = await getContentEntries(collection);
    const entryExists = entries.some((entry) => entry.slug === slug);

    if (!entryExists) {
      return null;
    }

    return importContentEntryModule(collection, slug);
  }
);

function sortEntries(entries: ContentEntry[]) {
  return entries.sort((a, b) => {
    if (a.publishedDate > b.publishedDate) return -1;
    if (a.publishedDate < b.publishedDate) return 1;

    return 0;
  });
}

async function importContentEntryModule(
  collection: ContentCollection,
  slug: string
) {
  const mod: unknown = await import(`../content/${collection}/${slug}.tsx`);

  // TypeScript cannot see what a dynamic content import exports, so validate
  // the module before returning it as a ContentEntryModule.
  assertContentEntryModule(mod, collection, slug);

  return mod;
}

function assertContentEntryModule(
  mod: unknown,
  collection: ContentCollection,
  slug: string
): asserts mod is ContentEntryModule {
  if (!mod || typeof mod !== "object") {
    throw new Error(
      `Content entry ${collection}/${slug} did not export a module.`
    );
  }

  const candidate = mod as Partial<ContentEntryModule>;
  const metadata = candidate.metadata;
  const hasComponent = typeof candidate.default === "function";

  const hasMetadata =
    !!metadata &&
    typeof metadata.title === "string" &&
    typeof metadata.publishedDate === "string" &&
    (metadata.description === undefined ||
      typeof metadata.description === "string");

  if (!hasComponent || !hasMetadata) {
    throw new Error(
      `Content entry ${collection}/${slug} must export a default component and valid metadata.`
    );
  }
}
