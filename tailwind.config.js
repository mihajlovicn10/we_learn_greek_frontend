
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#2563eb',
          secondary: '#1e40af',
          accent: '#3b82f6',
          dark: '#0a0f1c',
          light: '#ffffff',
          'primary-hover': '#1d4ed8',
          background: {
            dark: '#1f2937',
            light: '#f3f4f6'
          },
          text: {
            dark: '#e5e7eb',
            light: '#1f2937'
          },
          button: {
            dark: '#1a1a1a',
            light: '#f9f9f9'
          }
        },
        fontFamily: {
          sans: ['"DM Sans"', 'Inter', 'system-ui', 'Helvetica', 'Arial', 'sans-serif']
        },
        lineHeight: {
          normal: '1.5',
          heading: '1.1'
        },
        height: {
          '572': '572px',
          hero: '650px'
        },
        animation: {
          fadeIn: 'fadeIn 1s ease-in forwards',
          bounce: 'bounce 1s infinite'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          }
        }
      }
    },
    plugins: []
  };