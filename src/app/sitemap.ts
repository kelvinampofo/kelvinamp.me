import { MetadataRoute } from "next";

import { getDemos } from "./craft/utils";
import { getPosts } from "./writing/utils";

export const baseUrl = "https://kelvinamp.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/now", "/writing", "/craft", "/words"];

  const posts = await getPosts();
  const demos = await getDemos();

  const writingPages = posts.map(({ slug }) => `/writing/${slug}`);
  const demoPages = demos.map(({ slug }) => `/craft/${slug}`);

  const allPages = [...pages, ...writingPages, ...demoPages];

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));
}
