import { readdir } from "fs/promises";

type Context = "craft" | "writing";

interface Entry {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
  description?: string;
}

export async function getEntries(context: Context): Promise<Entry[]> {
  const basePath = `./src/app/${context}`;

  const slugs = await readdir(basePath, { withFileTypes: true });

  const directories = slugs.filter((entry) => entry.isDirectory());

  const entries = await Promise.all(
    directories.map(async (directory): Promise<Entry> => {
      const mod = await import(`../app/${context}/${directory.name}/page.mdx`);
      const { title, description, publishedDate } = mod.metadata;

      return {
        id: directory.name,
        slug: directory.name,
        title,
        publishedDate,
        description,
      };
    })
  );

  return entries.sort((a, b) => {
    if (a.publishedDate > b.publishedDate) return -1;
    if (a.publishedDate < b.publishedDate) return 1;
    return 0;
  });
}
