import { compareAsc, parseISO } from 'date-fns';

export type Prototype = {
  slug: string;
  id: number;
  title: string;
  href: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export const allPrototypes: Prototype[] = [
  {
    slug: 'carousel',
    id: 1,
    title: 'Carousel',
    href: '/carousel',
    publishedAt: '2023-08-19',
    summary: 'A minimal CSS based carousel.'
  },
  {
    slug: 'loading-indicators',
    id: 2,
    title: 'Loading indicators',
    href: '/loading-indicators',
    publishedAt: '2023-11-11',
    summary: 'Simple loading state indicators.'
  },
  {
    slug: 'tabs',
    id: 3,
    title: 'Tabs',
    href: '/tabs',
    publishedAt: '2024-05-11',
    summary: 'Tab bars from the Vercel dashboard.'
  },
  {
    slug: 'progressive-blur',
    id: 4,
    title: 'Progressive Blur',
    href: '/progressive-blur',
    publishedAt: '2024-05-27',
    summary: 'Instagram inspired progressive blur.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-progressive-blur.png'
  },
  {
    slug: 'hold-to-delete',
    id: 5,
    title: 'Hold to delete',
    href: '/hold-to-delete',
    publishedAt: '2024-06-09',
    summary: 'Hold to delete microinteraction.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-hold-to-delete.png'
  }
].sort((a, b) => {
  return compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt));
});
