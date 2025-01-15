/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/design-system/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#F58D3D',
          dark: '#DF6E3C',
          hover: '#E07C2C',
        },
      },
    },
  },
  plugins: [],
};
