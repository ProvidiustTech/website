/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',     // Makes deployment lighter on cPanel
  swcMinify: false,         // Disables heavy SWC minification (big memory saver)
  experimental: {
    workerThreads: false,   // Helps with Wasm memory issues
    cpus: 1,                // Limit to single core
  },
  typescript: {
    ignoreBuildErrors: true,   // Temporary,only if you have TS errors
  },
  eslint: {
    ignoreDuringBuilds: true,  // Safe in Next.js 16
  },
};

export default nextConfig;