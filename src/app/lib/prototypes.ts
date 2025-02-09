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
    slug: 'progressive-blur',
    id: 3,
    title: 'Progressive Blur',
    href: '/progressive-blur',
    publishedAt: '2024-05-27',
    summary: 'Progressive linear blur.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-progressive-blur.png'
  },
  {
    slug: 'hold-to-delete',
    id: 4,
    title: 'Hold to delete',
    href: '/hold-to-delete',
    publishedAt: '2024-06-09',
    summary: '"Hold to delete" interaction.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-hold-to-delete.png'
  },
  {
    slug: 'shimmer-text',
    id: 5,
    title: 'Shimmer text',
    href: '/shimmer-text',
    publishedAt: '2024-09-13',
    summary: 'Loading shimmer text from OpenAI o1.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-shimmer-text.png'
  },
  {
    slug: 'adaptive-interface',
    id: 6,
    title: 'Adaptive interface',
    href: '/adaptive-interface',
    publishedAt: '2025-01-10',
    summary: 'An adaptive interface based on usage.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-adaptive-interface.png'
  },
  {
    slug: 'scrolling-tab-bar',
    id: 7,
    title: 'Scrolling tab bar',
    href: '/scrolling-tab-bar',
    publishedAt: '2025-02-09',
    summary: 'Scrolling tab bar view with scroll fade.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-adaptive-interface.png'
  }
];
