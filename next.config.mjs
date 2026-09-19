/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for AWS S3 + CloudFront deployment
  output: "export",
  // Emit /path/index.html so CloudFront default root object routing works cleanly
  trailingSlash: true,
  images: {
    // next/image optimization requires a server; disable for static export
    unoptimized: true,
  },
  reactStrictMode: true,
  // Fail the build on type errors — production quality
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
