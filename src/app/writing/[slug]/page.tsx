import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { loadContentModule } from "../../../utils/content-loader";
import { getEntries } from "../../../utils/entries";

type Params = Promise<{ slug: string }>;

export default async function WritingPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = await loadContentModule("writing", slug);

  if (!post) {
    notFound();
  }

  const { default: Post } = post;

  return <Post />;
}

export async function generateStaticParams() {
  const entries = await getEntries("writing");

  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await loadContentModule("writing", slug);

  if (!post?.metadata) {
    return {};
  }

  const { title, description } = post.metadata;

  return {
    title,
    description,
  };
}

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
