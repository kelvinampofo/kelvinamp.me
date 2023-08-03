import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      animation: {
        tooltip: 'tooltipAnimation 0.25s ease-in-out',
        shine: 'shineAnimation 1.5s infinite alternate linear'
      },
      keyframes: {
        tooltipAnimation: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        shineAnimation: {
          '0%': { 'background-position': 'left' },
          '100%': { 'background-position': 'right' }
        }
      },
      backgroundSize: {
        '200': '200%'
      }
    }
  },
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config;
