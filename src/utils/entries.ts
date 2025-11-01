import { readdir } from "fs/promises";

type Collection = "craft" | "writing";

interface Entry {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
  description?: string;
}

export async function getEntries(collection: Collection): Promise<Entry[]> {
  const basePath = `./src/content/${collection}`;
  const files = await readdir(basePath, { withFileTypes: true });

  const entries = await Promise.all(
    files
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map(async (file): Promise<Entry> => {
        const slug = file.name.replace(/\.mdx$/, "");
        const mod = await import(`../content/${collection}/${slug}.mdx`);

        const { title, description, publishedDate } = mod.metadata;

        return {
          id: slug,
          slug,
          title,
          publishedDate,
          description,
        };
      })
  );

  return sortEntries(entries);
}

function sortEntries(entries: Entry[]) {
  return entries.sort((a, b) => {
    if (a.publishedDate > b.publishedDate) return -1;
    if (a.publishedDate < b.publishedDate) return 1;

    return 0;
  });
}
