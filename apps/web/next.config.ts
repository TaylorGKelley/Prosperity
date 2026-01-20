import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', 'react-native-web'],
};

export default nextConfig;
