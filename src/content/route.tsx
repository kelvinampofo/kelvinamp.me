import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Page from "../components/page/Page";

import {
  getContentEntries,
  getContentEntryModule,
  type ContentCollection,
} from "./collection";

type Params = Promise<{ slug: string }>;

// Each route file exports concrete Next handlers, but the repeated loading,
// page shell, metadata, and static-param behavior lives here
export function createContentRoute(
  collection: ContentCollection,
  { focusMode = false }: { focusMode?: boolean } = {}
) {
  async function ContentPage({ params }: { params: Params }) {
    const { slug } = await params;
    const entryModule = await getContentEntryModule(collection, slug);

    if (!entryModule) {
      notFound();
    }

    const { default: Entry } = entryModule;

    return (
      <Page backTo={`/${collection}`} focusMode={focusMode}>
        <Entry />
      </Page>
    );
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
