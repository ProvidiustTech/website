/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',     // Makes deployment lighter on cPanel
  experimental: {
    workerThreads: false,   // Helps with Wasm memory issues
    cpus: 1,                // Limit to single core
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;