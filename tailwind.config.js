/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text1: '#38364F',
        text2: '#C35858',
      },
      fontSize: {
        // : '32px',
        // h3: '24px',
        // base: '17px',
      },
    },
  },
  plugins: [],
};
