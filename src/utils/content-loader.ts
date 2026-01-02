import type { ComponentType } from "react";

interface ContentModule {
  default: ComponentType;
  metadata: {
    title: string;
    description?: string;
    publishedDate: string;
  };
}

type Collection = "writing" | "craft";

export async function loadContentModule(
  collection: Collection,
  slug: string
): Promise<ContentModule | null> {
  try {
    const contentModule: ContentModule = await import(
      `../content/${collection}/${slug}.tsx`
    );

    return contentModule;
  } catch (error) {
    console.error(
      `Failed to load ${collection} entry for slug: ${slug}`,
      error
    );

    return null;
  }
}
