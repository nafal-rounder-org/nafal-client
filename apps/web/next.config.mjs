/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': '../../assets',
    };
    return config;
  },
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

export default nextConfig;
