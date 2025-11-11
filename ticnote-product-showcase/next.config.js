/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  allowedDevOrigins: [
    'app-preview-5817ba31ebda4245bf01ad9b8576e37c.codebanana.com'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oci-useast-backend-public.dupdub.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;