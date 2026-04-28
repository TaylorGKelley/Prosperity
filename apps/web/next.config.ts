import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: '/api/auth/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
    },
  ],
  transpilePackages: ['@repo/ui', 'react-native-web'],
};

export default nextConfig;
