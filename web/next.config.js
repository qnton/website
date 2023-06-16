module.exports = {
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  compress: true,
  output: 'export',
  distDir: 'out',
};
