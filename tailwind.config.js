/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{html,js}",
    "./js/**/*.{html,js}",
    "./data/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F6B4F',
          dark: '#0A4A37',
          light: '#148F69',
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#0F6B4F',
          700: '#0A4A37',
          900: '#062B20',
        },
        secondary: {
          DEFAULT: '#0A4A37',
          light: '#0E634A',
          dark: '#062B20',
        },
        accent: {
          DEFAULT: '#E3A92B',
          hover: '#C9911E',
          light: '#FDE68A',
          50: '#FEFCE8',
        },
        cream: {
          DEFAULT: '#FFF8E8',
          50: '#FFFFFF',
          100: '#FFF8E8',
          200: '#FDF1D5',
          300: '#F5E4BE',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 107, 79, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(15, 107, 79, 0.1)',
        'floating': '0 20px 40px -10px rgba(10, 74, 55, 0.2)',
      }
    },
  },
  plugins: [],
}
