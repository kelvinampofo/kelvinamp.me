import { allPosts } from 'contentlayer/generated';
import { MetadataRoute } from 'next';
import { allPrototypes } from './data/prototypes';

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map(({ slug }) => ({
    url: `https://kelvinamp.me/writing/${slug}`,
    lastModified: formatDate(new Date())
  }));

  const prototypes = allPrototypes.map(({ slug }) => ({
    url: `https://kelvinamp.me/craft${slug}`,
    lastModified: formatDate(new Date())
  }));

  const routes = ['', '/now', '/writing', '/craft'].map((route) => ({
    url: `https://kelvinamp.me${route}`,
    lastModified: formatDate(new Date())
  }));

  return [...routes, ...posts, ...prototypes];
}
