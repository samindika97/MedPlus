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
      teal: "#559E8D",
      mintGreen: "#ACE8B5",
      grey: "#B0B0B0",
      lightGrey: "#E5E9EB",
    },
    extend: {
      backgroundImage: {
        'aboutUs': "url('assets/aboutusbg.jpeg')",
        
      }
    },
  },
  plugins: [],
};
