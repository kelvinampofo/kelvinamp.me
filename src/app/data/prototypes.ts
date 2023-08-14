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
    slug: '/parallax-card',
    _id: 1,
    title: 'Parallax credit card',
    href: '/parallax-card',
    publishedAt: '2023-08-14',
    summary: 'Interactive credit card interface, inspired by Monzo.'
  }
].sort((a, b) => {
  return compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt));
});
