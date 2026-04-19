/**
 * Grimório Digital - Global Tailwind CSS Configuration
 * Injetado no cliente via CDN para centralizar o padrão glassmorphism e responsivo.
 */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                theme: {
                    bg: '#050507',          /* Background super dark e imersivo */
                    panel: '#0a0a0f',       /* Paineis escuros */
                    border: '#1f1f25',      /* Bordas sutis */
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
                'fade-in': 'fadeIn 0.5s ease-out',
                'pulse-glow': 'pulseGlow 2s infinite',
            },
            keyframes: {
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(74, 158, 255, 0.2)' },
                    '50%': { boxShadow: '0 0 25px rgba(74, 158, 255, 0.6)' }
                }
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }
        }
    }
}
