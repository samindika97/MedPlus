/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: "#002333",
      teal: "#559E8D",
      mintGreen: "#ACE8B5",
      red: "#8B0000",
      grey: "#B0B0B0",
      lightGrey: "#E5E9EB",
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blueDefault: colors.blue,
      redDefault:colors.red,
    },
    extend: {
      backgroundImage: {
        'aboutUs': "url('assets/aboutusbg.jpeg')",
        
      }
    },
  },
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require("@tailwindcss/line-clamp"),
  ],
};
