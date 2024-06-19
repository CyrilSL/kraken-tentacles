/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.amazonaws.com',
        pathname: '/**'
      },
            //Old deleted octopus-memory
            {
              protocol: "https",
              hostname: "cpqplhiqiqvfocrrwxmw.supabase.co",
            },
            //kraken-memory
            {
              protocol: "https",
              hostname: "stnndvuzdvuokauwugrs.supabase.co",
            },
    ]
  },
  logging:{
    fetches:{
      fullUrl:true,
    }
  }
};
