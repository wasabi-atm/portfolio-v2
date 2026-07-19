/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/blog/[slug]': ['./outstatic/content/**/*'],
  },
};

export default nextConfig;
