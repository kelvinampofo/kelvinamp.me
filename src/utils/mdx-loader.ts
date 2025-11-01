import type { ComponentType } from "react";

interface MdxModule {
  default: ComponentType;
  metadata: {
    title: string;
    description?: string;
    publishedDate: string;
  };
}

type Collection = "writing" | "craft";

export async function loadMdxModule(
  collection: Collection,
  slug: string
): Promise<MdxModule | null> {
  try {
    const mdxModule: MdxModule = await import(
      `../content/${collection}/${slug}.mdx`
    );

    return mdxModule;
  } catch (error) {
    console.error(
      `Failed to load ${collection} entry for slug: ${slug}`,
      error
    );

    return null;
  }
}
