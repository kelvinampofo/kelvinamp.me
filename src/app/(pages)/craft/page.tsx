import { Metadata } from 'next';
import React from 'react';

import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import InlineLink from '@/app/components/ui/InlineLink';
import List from '@/app/components/ui/List';
import { allPrototypes } from '@/app/lib/prototypes';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Collection of interfaces and web prototypes.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Craft',
    description: 'Collection of interfaces and web prototypes.'
  },
  twitter: {
    title: 'Craft',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Collection of interfaces and web prototypes.',
    images: [
      {
        url: 'https://kelvinamp.me/og.jpeg'
      }
    ]
  }
};

export default function Craft() {
  return (
    <Container>
      <Heading className="mb-3">Craft</Heading>
      <p className="mb-10 text-secondary dark:text-secondary-dark">
        Collection of interfaces and web prototypes.
      </p>
      <List items={allPrototypes} route="craft" dateFormat="MMMM yyyy" />
      <InlineLink className="mt-12" href="/" arrowIcon hideUnderline ariaLabel="back to home page">
        Back
      </InlineLink>
    </Container>
  );
}
