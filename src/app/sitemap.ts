import { MetadataRoute } from "next";

import { getContentEntries } from "../utils/content-collection";

export const baseUrl = "https://kelvinamp.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/now",
    "/writing",
    "/craft",
    "/words",
    "/mood",
    "/readme",
  ];

  const posts = await getContentEntries("writing");
  const demos = await getContentEntries("craft");

  const writingPages = posts.map(({ slug }) => `/writing/${slug}`);
  const demoPages = demos.map(({ slug }) => `/craft/${slug}`);

  const allPages = [...pages, ...writingPages, ...demoPages];

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));
}
