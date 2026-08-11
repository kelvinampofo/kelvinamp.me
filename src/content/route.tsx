import type { Metadata } from "next";

import {
  getContentEntries,
  getContentEntryModule,
  type ContentCollection,
} from "./collection";

type Params = Promise<{ slug: string }>;

// each route file exports concrete Next handlers, the repeated entry loading,
// metadata, and static-param behavior lives here
export function createContentRoute(collection: ContentCollection) {
  async function ContentPage({ params }: { params: Params }) {
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
    const { title, description } = metadata;

    return {
      title,
      description,
      alternates: {
        canonical: `/${collection}/${slug}`,
      },
    };
  }

  return {
    ContentPage,
    generateMetadata,
    generateStaticParams,
  };
}
