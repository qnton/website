const baseConfig = require('qnton-prettier-config');

module.exports = {
  ...baseConfig,
  plugins: [require('prettier-plugin-tailwindcss')],
  importOrder: ['^@qnton/(.*)$', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindConfig: './web/tailwind.config.js',
};
