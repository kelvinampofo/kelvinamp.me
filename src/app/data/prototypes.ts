import { compareAsc, parseISO } from 'date-fns';

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
    slug: '/carousel',
    _id: 1,
    title: 'Carousel',
    href: '/carousel',
    publishedAt: '2023-08-18',
    summary: 'A minimal CSS based carousel interface.'
  }
].sort((a, b) => {
  return compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt));
});
