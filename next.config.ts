import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    serverActions: {},
  },
  images: {
    remotePatterns: [
      {
        hostname:"purple-petite-dragonfly-645.mypinata.cloud"
      }
    ],
  },
};

export default nextConfig;
