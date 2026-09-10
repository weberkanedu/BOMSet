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
        background: '#0c0e12',
        surface: '#15181e',
        'surface-elevated': '#1c2028',
        'surface-card': '#1a1e27',
        'surface-border': '#252a36',
        brand: {
          DEFAULT: '#00d68f',
          dark: '#00b377',
          light: '#33deb0',
          glow: 'rgba(0, 214, 143, 0.25)',
        },
        plan: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          glow: 'rgba(99, 102, 241, 0.25)',
        },
        category: {
          game: '#818cf8',
          location: '#f97316',
          book: '#34d399',
          tool: '#38bdf8',
          food: '#f59e0b',
          work: '#60a5fa',
          coffee: '#fb7185',
          film: '#e11d48',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-brand': '0 0 25px rgba(0, 214, 143, 0.35)',
        'glow-plan': '0 0 25px rgba(99, 102, 241, 0.35)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
