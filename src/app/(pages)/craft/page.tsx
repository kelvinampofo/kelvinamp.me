import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import CustomLink from '@/app/components/ui/CustomLink';
import List from '@/app/components/ui/List';
import { allPrototypes } from '@/app/lib/data';

import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Crafting interfaces, imbued with meticulousness + play.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Craft',
    description: 'Crafting interfaces, imbued with meticulousness + play.'
  },
  twitter: {
    title: 'Craft',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Crafting interfaces, imbued with meticulousness + play.',
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
      <Heading className="mb-3">Craft</Heading>
      <p className="mb-12 text-[#6F6F6F] dark:text-[#A0A0A0]">
        Crafting interfaces, imbued with quality + play
      </p>
      <Separator className="mb-3" />
      <List items={allPrototypes} route="craft" dateFormat="MM/yy" />
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
