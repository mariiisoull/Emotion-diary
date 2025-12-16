/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- Эта строка говорит Tailwind искать классы внутри папки src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}