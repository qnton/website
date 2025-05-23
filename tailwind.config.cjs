/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        "pulse-bg": {
          "0%, 100%": {
            "background-color": "#e5e5e5",
          },
          "50%": {
            "background-color": "#f5f5f5",
          },
        },
      },
      animation: {
        "pulse-bg": "pulse-bg 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: ({ theme }) => ({
        header: `linear-gradient(to bottom, 
          ${theme("colors.neutral.50/1")} 0%, 
          ${theme("colors.neutral.50/0.95")} 10%, 
          ${theme("colors.neutral.50/0.8")} 25%, 
          ${theme("colors.neutral.50/0.5")} 50%, 
          ${theme("colors.neutral.50/0.2")} 75%, 
          ${theme("colors.transparent")} 100%)`,
      }),
      fontFamily: {
        "satoshi-light": ["Satoshi-Light"],
        "satoshi-regular": ["Satoshi-Regular"],
        "satoshi-medium": ["Satoshi-Medium"],
        "satoshi-bold": ["Satoshi-Bold"],
        "satoshi-black": ["Satoshi-Black"],
      },
      height: {
        "5v": "5dvh",
        "10v": "10dvh",
        "15v": "15dvh",
        "20v": "20dvh",
        "30v": "30dvh",
        "35v": "35dvh",
        "40v": "40dvh",
        "50v": "50dvh",
        "60v": "60dvh",
        "70v": "70dvh",
        "80v": "80dvh",
        "90v": "90dvh",
        "100v": "100dvh",
      },
      maxWidth: {
        "5v": "5dvw",
        "10v": "10dvw",
        "15v": "15dvw",
        "20v": "20dvw",
        "30v": "30dvw",
        "35v": "35dvw",
        "40v": "40dvw",
        "50v": "50dvw",
        "60v": "60dvw",
        "70v": "70dvw",
        "80v": "80dvw",
        "90v": "90dvw",
        "100v": "100dvw",
        100: "100rem",
      },
      maxHeight: {
        80: "80rem",
      },
      minHeight: {
        50: "50rem",
      },
      spacing: {
        "5v": "5dvh",
        "10v": "10dvh",
        "15v": "15dvh",
        "20v": "20dvh",
        "30v": "30dvh",
        "35v": "35dvh",
        "40v": "40dvh",
        "50v": "50dvh",
        "60v": "60dvh",
        "70v": "70dvh",
        "80v": "80dvh",
        "90v": "90dvh",
        "100v": "100dvh",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
