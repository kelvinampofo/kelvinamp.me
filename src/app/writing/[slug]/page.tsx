import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { getEntries } from "../../../utils/entries";

type Params = Promise<{ slug: string }>;

interface PostModule {
  default: ComponentType;
  metadata: {
    title: string;
    description?: string;
    publishedDate: string;
  };
}

export default async function WritingPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = await loadPost(slug);

  if (!post) {
    notFound();
  }

  const { default: Post } = post;

  return <Post />;
}

async function loadPost(slug: string): Promise<PostModule | null> {
  try {
    return await import(`../../../content/writing/${slug}.mdx`);
  } catch (error) {
    console.error(`Failed to load writing post for slug: ${slug}`, error);

    return null;
  }
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

  const post = await loadPost(slug);

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
