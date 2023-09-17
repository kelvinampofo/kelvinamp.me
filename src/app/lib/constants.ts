import { compareAsc, parseISO } from 'date-fns';

export type Prototype = {
  slug: string;
  id: number;
  title: string;
  href: string;
  publishedAt: string;
  summary: string;
  image?: string | undefined;
};

export const allPrototypes: Prototype[] = [
  {
    slug: '/carousel',
    id: 1,
    title: 'Carousel',
    href: '/carousel',
    publishedAt: '2023-08-19',
    summary: 'A minimal CSS based carousel.'
  }
].sort((a, b) => {
  return compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt));
});
