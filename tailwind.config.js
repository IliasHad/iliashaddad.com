// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ["./src/**/*.js"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Muli", "sans-serif"],
      body: ["Muli", "sans-serif"],
    },
    extend: {
      margin: {
        "96": "24rem",
        "128": "32rem",
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
