/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DBFF',
          300: '#7AB8FF',
          400: '#3892FF',
          500: '#0066FF', // Azul Elétrico Logo
          600: '#0052D4',
          700: '#003D9E',
          800: '#002966',
          900: '#061329', // Azul Meia-Noite Fundo
          950: '#030A17',
          cyan: '#00D2FF', // Destaque aerodinâmico
          navy: '#0A192F',
          dark: '#050D1A',
        }
      }
    },
  },
  plugins: [],
}
