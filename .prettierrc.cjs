module.exports = {
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  singleAttributePerLine: true,
  quoteProps: "as-needed",
  bracketSameLine: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  jsxSingleQuote: false,
  arrowParens: "always",
  proseWrap: "never",
  htmlWhitespaceSensitivity: "strict",
  endOfLine: "lf",
};
