import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withMDX(nextConfig);
