/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["books.google.com"],
  },
  env: {
    RECOMMENDATION: process.env.RECOMMENDATION,
  },
};

module.exports = nextConfig;
