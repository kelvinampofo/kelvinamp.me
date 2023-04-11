import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/now'].map((route) => ({
    url: `https://kelvinamp.me${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }));

  return [...routes];
}
