import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vvotv2lifqdlacds.public.blob.vercel-storage.com",
        pathname: "/providers/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
