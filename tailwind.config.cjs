const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [],
};

module.exports = config;
