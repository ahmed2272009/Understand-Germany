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
        // Semantic user-specified palette:
        learning: {
          DEFAULT: '#2563EB', // Blue for learning
          light: '#EFF6FF',
          dark: '#1D4ED8',
          subtle: '#DBEAFE'
        },
        correct: {
          DEFAULT: '#16A34A', // Green for correct
          light: '#F0FDF4',
          dark: '#15803D',
          subtle: '#DCFCE7'
        },
        incorrect: {
          DEFAULT: '#DC2626', // Red for incorrect
          light: '#FEF2F2',
          dark: '#B91C1C',
          subtle: '#FEE2E2'
        },
        grammar: {
          DEFAULT: '#7C3AED', // Purple for grammar
          light: '#F5F3FF',
          dark: '#6D28D9',
          subtle: '#EDE9FE'
        },
        streak: {
          DEFAULT: '#EA580C', // Orange for streaks
          light: '#FFF7ED',
          dark: '#C2410C',
          subtle: '#FFEDD5'
        },
        xp: {
          DEFAULT: '#F97316', // Orange for XP
          light: '#FFF7ED',
          dark: '#C2410C',
          subtle: '#FFEDD5'
        },
        attention: {
          DEFAULT: '#EAB308', // Yellow for attention
          light: '#FEFCE8',
          dark: '#A16207',
          subtle: '#FEF08A'
        },
        gender: {
          der: '#0284C7',
          die: '#F43F5E',
          das: '#EAB308',
          plural: '#059669'
        },
        heart: '#EF4444'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'antigravity': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'antigravity-hover': '0 25px 50px -12px rgba(37, 99, 235, 0.15), 0 0 1px 1px rgba(37, 99, 235, 0.1)',
        'card-glow': '0 0 25px -5px rgba(124, 58, 237, 0.15)'
      }
    },
  },
  plugins: [],
}
