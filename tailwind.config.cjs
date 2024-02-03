/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 2px -2px 10px 2px rgb(86 35 87 / 0.40)'
      }
    },
  },
  plugins: [],
}
