import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: () => [
    // rewrites requests to /api and forwards it to /api/* for better-auth integration
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
    },
  ],
  transpilePackages: ['@repo/ui', 'react-native-web'],
};

export default nextConfig;
