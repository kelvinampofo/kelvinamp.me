import Container from '@/app/components/generic/Container';
import CustomLink from '@/app/components/ui/CustomLink';
import PrototypeList from '@/app/components/ui/List';
import { allPrototypes } from '@/app/data/prototypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Crafting interfaces, immersed in art+technology.',
  openGraph: {
    title: 'Craft',
    description: 'Crafting interfaces, immersed in art+technology.'
  },
  twitter: {
    title: 'Craft',
    site: '@kelvinamp_',
    card: 'summary',
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
        Crafting interfaces / prototypes.
      </p>
      <hr className="mb-3 h-px border-0 bg-neutral-200 dark:bg-neutral-800" />
      <PrototypeList items={allPrototypes} route="craft" />
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
