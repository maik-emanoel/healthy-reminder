/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#7FC4ED',
        blueDark: '#659ABA',
        gray: {
          '100': '#FBF9FE',
          '200': '#322F40',
          '300': '#282533',
          '400': '#1D1B26',
          '500': '#0F0E13'
        }
      }
    },
  },
  plugins: [],
}

