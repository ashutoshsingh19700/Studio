import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // In development, re-check swapped photos almost immediately (default is 4 hours).
    minimumCacheTTL: isDev ? 1 : 14400,
  },
};

export default nextConfig;
