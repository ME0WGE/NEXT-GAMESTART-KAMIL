/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure the Next.js proxy to handle API requests
  async rewrites() {
    return [
      {
        source: "/api/games/:path*",
        destination: "https://www.freetogame.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
