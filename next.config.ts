/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // ✅ Enables React Strict Mode
  swcMinify: true,        // ✅ Minifies JavaScript for better performance
  async redirects() {
    return [
      {
        source: "/",          // When visiting "/"
        destination: "/landing", // Redirect to "/landing"
        permanent: true,      // Use 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;