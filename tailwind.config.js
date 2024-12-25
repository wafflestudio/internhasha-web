/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      red: '#E54459',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      gray: {
        DEFAULT: '#C4C4C4',
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
    fontFamily: {
      default: [
        'Pretendard',
        'system-ui',
        '-apple-system',
        '"Noto Sans"',
        'sans-serif',
      ],
    },
    extend: {
      boxShadow: {
        bottom: '0 5px 5px -5px rgb(0 0 0 / 0.2)',
      },
    },
  },
  plugins: [],
};
