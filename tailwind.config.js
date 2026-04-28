/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbecff',
          200: '#bddcff',
          300: '#8ac5ff',
          400: '#54a9ff',
          500: '#2a8bff',
          600: '#1171f0',
          700: '#0b59cf',
          800: '#104ca8',
          900: '#154183'
        },
        accent: {
          50: '#fff4ed',
          100: '#ffe7d5',
          200: '#ffc9a9',
          300: '#ffa874',
          400: '#ff7f3e',
          500: '#fe6018',
          600: '#ef450f',
          700: '#c6310f',
          800: '#9d2813',
          900: '#7e2412'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace']
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem'
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
        'panel': '0 8px 24px -4px rgb(0 0 0 / 0.08)',
      }
    }
  },
  plugins: []
};
