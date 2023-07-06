/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 5px -5px 20px 5px rgb(86 35 87 / 0.40)'
      }
    },
  },
  plugins: [],
}
