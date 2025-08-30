import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
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

const withMDX = createMDX({});

export default withMDX(nextConfig);
