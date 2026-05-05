import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getContentEntries,
  getContentEntryModule,
  type ContentCollection,
} from "./content-collection";

type Params = Promise<{ slug: string }>;

// Route handlers are created per collection so Next receives stable exports
// while collection loading stays independent of route filenames.
export function createContentRoute(collection: ContentCollection) {
  async function ContentPage({ params }: { params: Params }) {
    const { slug } = await params;
    const entryModule = await getContentEntryModule(collection, slug);

    if (!entryModule) {
      notFound();
    }

    const { default: Entry } = entryModule;

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
    const entryModule = await getContentEntryModule(collection, slug);

    if (!entryModule) {
      return {};
    }

    const { title, description } = entryModule.metadata;

    return {
      title,
      description,
    };
  }

  return {
    ContentPage,
    generateMetadata,
    generateStaticParams,
  };
}
