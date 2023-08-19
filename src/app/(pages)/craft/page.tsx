import Container from '@/app/components/generic/Container';
import Separator from '@/app/components/generic/Separator';
import CustomLink from '@/app/components/ui/CustomLink';
import List from '@/app/components/ui/List';
import { allPrototypes } from '@/app/data/prototypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Crafting interfaces, immersed in art+technology.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Craft',
    description: 'Crafting interfaces, immersed in art+technology.'
  },
  twitter: {
    title: 'Craft',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Crafting interfaces, immersed in art+technology.',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg',
        height: 1200,
        width: 1200
      }
    ]
  }
};

export default function Craft() {
  return (
    <Container>
      <h1 className="mb-3 text-lg font-medium">Craft</h1>
      <p className="mb-12 text-[#6F6F6F] dark:text-neutral-400">
        Crafting interfaces, art+technology.
      </p>
      <Separator className="mb-3" />
      <List items={allPrototypes} route="craft" />
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
