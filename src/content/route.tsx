import type { Metadata } from "next";
import type { ComponentType } from "react";

import {
  getContentEntries,
  getContentEntry,
  type ContentCollection,
} from "./collection";

type Params = Promise<{ slug: string }>;

export interface ContentEntryModule {
  default: ComponentType;
}

export function createRoute(
  collection: ContentCollection,
  loadEntry: (slug: string) => Promise<ContentEntryModule> | undefined
) {
  async function EntryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const entry = await loadEntry(slug);

    if (!entry) {
      throw new Error(`Missing content module for ${collection}/${slug}.`);
    }

    const { default: Entry } = entry;

    return <Entry />;
  }

  async function generateStaticParams() {
    const entries = await getContentEntries(collection);

    return entries.map(({ slug }) => ({ slug }));
  }

  async function generateMetadata({
    params,
  }: {
    params: Params;
  }): Promise<Metadata> {
    const { slug } = await params;
    const { title, description, publishedDate } = await getContentEntry(
      collection,
      slug
    );

    const canonical = `/${collection}/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        type: "article",
        url: canonical,
        title,
        description,
        publishedTime: publishedDate,
      },
    };
  }

  return {
    EntryPage,
    generateMetadata,
    generateStaticParams,
  };
}
