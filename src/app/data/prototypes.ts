export type Prototype = {
  slug: string;
  _id: number;
  title: string;
  href: string;
  publishedAt: string;
  summary: string;
  image?: string | undefined;
};

export const allPrototypes: Prototype[] = [
  {
    slug: '/credit-card',
    _id: 1,
    title: 'Parallax credit card',
    href: '/credit-card',
    publishedAt: '2023-08-13',
    summary: 'Interactive credit card interface for fidgeting purposes, inspired by Monzo.'
  }
];
