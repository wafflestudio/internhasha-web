/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    '../../packages/design-system/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          'Pretendard',
          'AppleGothicNedSD',
          'malgun gothic',
          'sans-serif',
        ],
      },
      colors: {
        grey: {
          DEFAULT: '#9FA9B9',
          normal: '#9FA9B9',
          'normal-hover': '#8F98A7',
          'normal-active': '#718794',
          light: '#F5F6F8',
          'light-hover': '#F1F2F5',
          'light-active': '#E1E4E9',
          dark: '#777F8B',
          'dark-hover': '#5F656F',
          'dark-active': '#484C53',
          darker: '#383B41',
        },
        red: {
          DEFAULT: '#FF3E3E',
          normal: '#FF3E3E',
          'normal-hover': '#E63838',
          'normal-active': '#CC3232',
          light: '#FFECEC',
          'light-hover': '#FFE2E2',
          'light-active': '#FFC3C3',
          dark: '#BF2F2F',
          'dark-hover': '#992525',
          'dark-active': '#731C1C',
          darker: '#591616',
        },
        blue: {
          DEFAULT: '#3E6FFF',
          normal: '#3E6FFF',
          'normal-hover': '#3864E6',
          'normal-active': '#3259CC',
          light: '#ECF1FF',
          'light-hover': '#E2E9FF',
          'light-active': '#C3D2FF',
          dark: '#2F53BF',
          'dark-hover': '#254399',
          'dark-active': '#1C3273',
          darker: '#162759',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        sm: '580px',
        md: '760px',
        lg: '984px',
        xl: '1344px',
      },
      width: {
        'screen-sm': '715px',
        'screen-md': '940px',
        'screen-lg': '1300px',
        'screen-xl': '1464px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
