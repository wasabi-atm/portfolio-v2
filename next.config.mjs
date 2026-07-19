/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/blog/[slug]': ['./outstatic/content/**/*'],
    },
  },
};

export default nextConfig;
