import { allPosts } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `https://kelvinamp.me/thoughts${post.slug}`,
    lastModified: formatDate(new Date())
  }));

  const routes = ['', '/now', '/thoughts'].map((route) => ({
    url: `https://kelvinamp.me${route}`,
    lastModified: formatDate(new Date())
  }));

  return [...routes, ...posts];
}
