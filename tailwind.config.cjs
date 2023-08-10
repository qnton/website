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
      fontFamily: {
        satoshiLight: ["Satoshi-Light"],
        satoshiRegular: ["Satoshi-Regular"],
        satoshiMedium: ["Satoshi-Medium"],
        satoshiBold: ["Satoshi-Bold"],
        satoshiBlack: ["Satoshi-Black"],
      },
      height: {
        "5v": "5vh",
        "10v": "10vh",
        "15v": "15vh",
        "20v": "20vh",
        "30v": "30vh",
        "35v": "35vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      maxWidth: {
        "5v": "5vw",
        "10v": "10vw",
        "15v": "15vw",
        "20v": "20vw",
        "30v": "30vw",
        "35v": "35vw",
        "40v": "40vw",
        "50v": "50vw",
        "60v": "60vw",
        "70v": "70vw",
        "80v": "80vw",
        "90v": "90vw",
        "100v": "100vw",
        100: "100rem",
      },
      maxHeight: {
        80: "80rem",
      },
      minHeight: {
        50: "50rem",
      },
      spacing: {
        "5v": "5vh",
        "10v": "10vh",
        "15v": "15vh",
        "20v": "20vh",
        "30v": "30vh",
        "35v": "35vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("@tailwindcss/typography"),
  ],
};
