/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-cal)', 'Georgia', 'serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#241e20',
          2: '#2c2528',
          3: '#342c2f',
          4: '#3d3336',
        },
        brand: {
          teal: '#2ed8c3',
          'teal-dim': 'rgba(46,216,195,0.12)',
          'teal-light': '#5ee3d2',
          'teal-lighter': '#9aeee6',
          blue: '#585de1',
          'blue-dim': 'rgba(88,93,225,0.12)',
          'blue-light': '#7b7fe8',
          dark: '#241e20',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          hover: 'rgba(255,255,255,0.14)',
          strong: 'rgba(255,255,255,0.2)',
        },
        text: {
          DEFAULT: '#f0f0f0',
          2: '#a0a0b0',
          3: '#706870',
          4: '#504850',
        },
        // Keep standard Tailwind color names for compatibility
        green: {
          DEFAULT: '#2ed8c3',
          dim: 'rgba(46,216,195,0.12)',
          400: '#5ee3d2',
          500: '#2ed8c3',
          600: '#20b8a6',
        },
        blue: {
          DEFAULT: '#585de1',
          dim: 'rgba(88,93,225,0.12)',
          400: '#7b7fe8',
          500: '#585de1',
        },
        purple: { DEFAULT: '#a855f7', dim: 'rgba(168,85,247,0.12)' },
        amber: { DEFAULT: '#f59e0b', dim: 'rgba(245,158,11,0.12)' },
        red: { DEFAULT: '#ef4444', dim: 'rgba(239,68,68,0.12)' },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        'radial-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(46,216,195,0.08), transparent)',
        'hero-glow': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,216,195,0.1), transparent)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        glowPulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-8px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
      borderRadius: { xl: '12px', '2xl': '16px', '3xl': '24px' },
    },
  },
  plugins: [],
}
