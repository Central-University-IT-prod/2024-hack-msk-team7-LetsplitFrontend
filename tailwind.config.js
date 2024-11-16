/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'text': 'var(--text)',
      'outline': 'var(--outline)',
      'background': 'var(--background)',
      'accent': 'var(--accent)',
      'error': 'var(--error)',
      'panel': 'var(--panel)',
    },
    extend: {
      spacing: {

      }
    },
    screens: {
      'desktop': '720px',
    },
  },
  plugins: [],
}
