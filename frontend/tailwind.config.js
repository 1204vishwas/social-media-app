/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: {
          950: '#040308',
          900: '#090814',
          850: '#0e0c1f',
          800: '#14112c',
          750: '#1a163a',
          700: '#221d4c',
          600: '#322c6b',
        },
        aura: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        electric: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
          fuchsia: '#d946ef',
          cyan: '#38bdf8',
          glow: '#ec4899',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(168, 85, 247, 0.25)',
        'glow-md': '0 0 30px rgba(168, 85, 247, 0.35)',
        'glow-lg': '0 0 50px rgba(147, 51, 234, 0.4)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.3)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-16px) scale(1.02)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(16px) scale(0.98)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
