/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
    "./**/*.html" // Inclui todos os arquivos HTML
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        theme: {
          bg: '#0a0a0c',
          panel: '#0f0f12',
          border: '#2a2a2e',
          text: '#e8e4dc',
          blue: '#4a9eff',
          orange: '#ff6b35',
          red: '#dc2626',
          green: '#22c55e',
          purple: '#8b5cf6',
          yellow: '#f59e0b',
          pink: '#ec4899',
          gold: '#d4a76a',
          copper: '#8b7355'
        }
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        slideInRight: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}