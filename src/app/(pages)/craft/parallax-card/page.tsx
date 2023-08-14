import { Metadata } from 'next';
import ParallaxCard from './ui/ParallaxCard';

export const metadata: Metadata = {
  title: 'Parallax credit card',
  description: 'Interactive credit card interface, inspired by Monzo.',
  authors: [{ name: 'Kelvin Ampofo' }],
  openGraph: {
    title: 'Parallax credit cardft',
    description: 'Interactive credit card interface, inspired by Monzo.',
    images: [
      {
        url: 'https://kelvinamp.me/parallax-card.png',
        height: 1200,
        width: 1200,
        alt: 'Credit card image'
      }
    ]
  },
  twitter: {
    title: 'Parallax credit card',
    site: '@kelvinamp_',
    card: 'summary',
    description: 'Interactive credit card interface, inspired by Monzo.',
    images: [
      {
        url: 'https://kelvinamp.me/parallax-card.png',
        height: 1200,
        width: 1200,
        alt: 'Credit card image'
      }
    ]
  }
};

export default function ParallaxCardPage() {
  return <ParallaxCard />;
}
