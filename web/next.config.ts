import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next only serves qualities on this list. 75 is the default; 85/90 are used by the portfolio grid and viewer.
    qualities: [75, 85, 90],
    // In development, re-check swapped photos almost immediately (default is 4 hours).
    minimumCacheTTL: isDev ? 1 : 14400,
  },
};

export default nextConfig;
