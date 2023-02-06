/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Muli", "sans-serif"],
      body: ["Muli", "sans-serif"],
    },
    extend: {
      margin: {
        96: "24rem",
        128: "32rem",
      },
      colors: {
        "stone-light": "rgb(255, 255, 255)",
        stone: "rgb(95, 94, 92)",
      },
    },
  },
  plugins: [  require("@tailwindcss/typography"),
],
}
