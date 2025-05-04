import { readdir } from "fs/promises";

interface Demo {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
  summary: string;
}

interface MDXModule {
  metadata: {
    title: string;
    summary: string;
    publishedDate: string;
  };
}

export async function getDemos(): Promise<Demo[]> {
  const slugs = await readdir("./src/app/craft", {
    withFileTypes: true,
  });

  const directories = slugs.filter((entry) => entry.isDirectory());

  const demos: Demo[] = await Promise.all(
    directories.map(async (directory): Promise<Demo> => {
      const mod: MDXModule = await import(`./${directory.name}/page.mdx`);
      const { title, summary, publishedDate } = mod.metadata;

      return {
        id: directory.name,
        slug: directory.name,
        title,
        summary,
        publishedDate,
      };
    })
  );

  return demos.sort((a, b) => {
    if (a.publishedDate > b.publishedDate) return -1;
    if (a.publishedDate < b.publishedDate) return 1;
    return 0;
  });
}
