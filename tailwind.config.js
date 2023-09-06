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
      },
      animation: {
        jump: 'jump .8s alternate infinite'
      },
      keyframes: {
        jump: {
          '100%': {
            transform: 'translateY(-10px)'
          }
        }
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '700px'},
        // => @media (max-width: 700px) { ... }
  
        'sm': {'max': '425px'},
        // => @media (max-width: 425px) { ... }
      },
    },
  },
  plugins: [],
}

