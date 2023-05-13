import { allPosts } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `https://kelvinamp.me/thoughts${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0]
  }));

  const routes = ['', '/now', '/thoughts'].map((route) => ({
    url: `https://kelvinamp.me${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }));

  return [...routes, ...posts];
}
