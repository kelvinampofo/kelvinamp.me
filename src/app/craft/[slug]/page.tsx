import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { loadContentModule } from "../../../utils/content-loader";
import { getEntries } from "../../../utils/entries";

type Params = Promise<{ slug: string }>;

export default async function CraftPage({ params }: { params: Params }) {
  const { slug } = await params;

  const demo = await loadContentModule("craft", slug);

  if (!demo) {
    notFound();
  }

  const { default: Demo } = demo;

  return <Demo />;
}

export async function generateStaticParams() {
  const entries = await getEntries("craft");

  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const demo = await loadContentModule("craft", slug);

  if (!demo?.metadata) {
    return {};
  }

  const { title, description } = demo.metadata;

  return {
    title,
    description,
  };
}

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
