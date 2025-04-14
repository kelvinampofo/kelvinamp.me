import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/kelvinampofo',
        permanent: true
      },
      {
        source: '/meet',
        destination: 'https://cal.com/kelvinamp/30min?layout=week_view',
        permanent: true
      },
      {
        source: '/x',
        destination: 'https://twitter.com/_kelvinamp',
        permanent: true
      }
    ];
  }
};

export default withContentlayer(nextConfig);
