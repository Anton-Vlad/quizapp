/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.tsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}