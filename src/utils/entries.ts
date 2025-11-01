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
  if (collection === "writing") {
    const basePath = "./src/content/writing";
    const files = await readdir(basePath, { withFileTypes: true });

    const mdxFiles = files.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".mdx")
    );

    const entries = await Promise.all(
      mdxFiles.map(async (file): Promise<Entry> => {
        const slug = file.name.replace(/\.mdx$/, "");
        const mod = await import(`../content/writing/${slug}.mdx`);

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

  const basePath = `./src/app/${collection}`;
  const directories = (await readdir(basePath, { withFileTypes: true })).filter(
    (entry) => entry.isDirectory()
  );

  const entries = await Promise.all(
    directories.map(async (directory): Promise<Entry> => {
      const mod = await import(
        `../app/${collection}/${directory.name}/page.mdx`
      );
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

  return sortEntries(entries);
}

function sortEntries(entries: Entry[]) {
  return entries.sort((a, b) => {
    if (a.publishedDate > b.publishedDate) return -1;
    if (a.publishedDate < b.publishedDate) return 1;

    return 0;
  });
}
