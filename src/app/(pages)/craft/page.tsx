import Container from '@/app/components/generic/Container';
import Heading from '@/app/components/generic/Heading';
import Separator from '@/app/components/generic/Separator';
import Text from '@/app/components/generic/Text';
import CustomLink from '@/app/components/ui/CustomLink';
import List from '@/app/components/ui/List';
import { allPrototypes } from '@/app/lib/prototypes';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Crafting web interfaces.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Craft',
    description: 'Crafting web interfaces.'
  },
  twitter: {
    title: 'Craft',
    site: '@kelvinamp_',
    card: 'summary_large_image',
    description: 'Crafting web interfaces.',
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
      <Text className="mb-10" colour="secondary">
        Crafting web interfaces just for play.
      </Text>
      <Separator className="mb-3" />
      <List items={allPrototypes} route="craft" showSummary />
      <span className="mt-12">
        <CustomLink href="/" ariaLabel="go back to home page" arrowIcon>
          Back
        </CustomLink>
      </span>
    </Container>
  );
}
