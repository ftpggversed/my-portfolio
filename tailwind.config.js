/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // ← toggles dark styles via <html class="dark">
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
};