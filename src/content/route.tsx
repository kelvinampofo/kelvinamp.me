import type { Metadata } from "next";

import {
  getContentEntries,
  getContentEntryModule,
  type ContentCollection,
} from "./collection";

type Params = Promise<{ slug: string }>;

// each route file exports concrete Next handlers, the repeated entry loading,
// metadata, and static-param behavior lives here
export function createRoute(collection: ContentCollection) {
  async function EntryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const { default: Entry } = await getContentEntryModule(collection, slug);

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
    const { metadata } = await getContentEntryModule(collection, slug);
    const { title, description, publishedDate } = metadata;

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
