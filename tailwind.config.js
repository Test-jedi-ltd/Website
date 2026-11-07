/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBrown: "#FDF9D2",
        darkBrown: "#151240",
        accentBrown: "#964A21",
        mediumBrown: "#D9C5B2",
      }
    }
  }
}