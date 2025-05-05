import { readdir } from "fs/promises";

export interface Post {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
}

interface MDXModule {
  metadata: {
    title: string;
    description: string;
    publishedDate: string;
  };
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await readdir("./src/app/writing", {
    withFileTypes: true,
  });

  const directories = slugs.filter((entry) => entry.isDirectory());

  const posts: Post[] = await Promise.all(
    directories.map(async (directory): Promise<Post> => {
      const mod: MDXModule = await import(`./${directory.name}/page.mdx`);
      const { title, publishedDate } = mod.metadata;

      return {
        id: directory.name,
        slug: directory.name,
        title,
        publishedDate,
      };
    })
  );

  return posts.sort((a, b) => {
    if (a.publishedDate > b.publishedDate) return -1;
    if (a.publishedDate < b.publishedDate) return 1;
    return 0;
  });
}
