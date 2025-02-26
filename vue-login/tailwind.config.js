/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890FF',
        'primary-light': '#40A9FF',
      },
      animation: {
        'grow-up': 'growUp 1s ease-out forwards',
      },
      keyframes: {
        growUp: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        }
      },
    },
  },
  plugins: [],
}
