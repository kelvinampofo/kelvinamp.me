const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    appDir: true,
    typedRoutes: true
  }
};

module.exports = nextConfig;
module.exports = withContentlayer(nextConfig);