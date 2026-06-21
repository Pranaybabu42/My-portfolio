/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
      },
      boxShadow: {
        panel: '0 12px 30px -18px rgba(0, 0, 0, 0.85), 0 8px 20px -15px rgba(230, 80, 27, 0.25)',
        glow: '0 0 0 1px rgba(230, 80, 27, 0.4), 0 0 32px -10px rgba(230, 80, 27, 0.55)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-130%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}