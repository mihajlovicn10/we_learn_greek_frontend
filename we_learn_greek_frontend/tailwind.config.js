/**
 * We Learn Greek — design tokens
 *
 * Palette: Greek flag inspired — blue and white shades only
 * - brand: Aegean blues (nav, primary actions, headings)
 * - accent / sand / olive: aliases into the same blue-white family
 * - surface: white cards and elevated panels
 *
 * Typography: Inter (UI) + Literata (display / Greek-friendly headings)
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a5f',
          950: '#172554',
        },
        accent: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
        sand: {
          DEFAULT: '#eff6ff',
          dark: '#dbeafe',
          darker: '#bfdbfe',
        },
        olive: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
          dark: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Literata', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'card-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
        'card-hover': '0 12px 24px -4px rgb(30 58 95 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, #1e3a5f, #2563eb)',
        'gradient-brand-soft': 'linear-gradient(to right, #1d4ed8, #60a5fa)',
        'gradient-hero-overlay': 'linear-gradient(to bottom, rgb(0 0 0 / 0.45), rgb(0 0 0 / 0.55))',
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
