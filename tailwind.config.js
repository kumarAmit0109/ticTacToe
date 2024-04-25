/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        'blackWith33': '#00000033',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      screens: {
        'xsm': '480px'
      }
    },
  },
  plugins: [],
}

