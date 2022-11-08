// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  content: ["./src/**/*.js"],
  darkMode: "class",
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
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/typography"),
  ],
};
