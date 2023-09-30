/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: "#002333",
      babyBlue: "#E2E9FF",
      teal: "#559E8D",
      mintGreen: "#ACE8B5",
      red: "#8B0000",
      grey: "#B0B0B0",
      lightGrey: "#E5E9EB",
    },
    extend: {},
  },
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require("@tailwindcss/line-clamp"),
  ],
};
