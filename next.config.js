// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    typedRoutes: true
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
        destination: 'https://twitter.com/kelvinamp_',
        permanent: true
      },
      {
        source: '/cv',
        destination: 'https://read.cv/kelvinampofo',
        permanent: true
      }
    ];
  }
};

module.exports = withContentlayer(nextConfig);
