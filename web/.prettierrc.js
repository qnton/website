const baseConfig = require('qnton-prettier-config');

module.exports = {
  ...baseConfig,
  plugins: [require('prettier-plugin-tailwindcss')],
  importOrder: [
    '^@core/(.*)$',
    '^@server/(.*)$',
    '^components/(.*)$',
    '^context/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindConfig: './tailwind.config.js',
};
