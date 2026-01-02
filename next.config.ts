import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/kelvinampofo",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://twitter.com/_kelvinamp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
