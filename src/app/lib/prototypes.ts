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
    slug: 'scroll-fade',
    id: 7,
    title: 'Scroll fade',
    href: '/scroll-fade',
    publishedAt: '2025-02-09',
    summary: 'Tab bar view with a scroll fade.',
    image: 'https://kelvinamp.me/assets/images/og-images/og-scroll-fade.png'
  },
  {
    slug: 'hold-for-sound',
    id: 8,
    title: 'Hold for sound',
    href: '/hold-for-sound',
    publishedAt: '2025-03-15',
    summary: 'Audio interface',
    image: 'https://kelvinamp.me/assets/images/og-images/og-hold-for-sound.png'
  }
];
