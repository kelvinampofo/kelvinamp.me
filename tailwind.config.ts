import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#161616',
        'primary-dark': '#EDEDED',
        secondary: '#6F6F6F',
        'secondary-dark': '#A0A0A0'
      },
      spacing: {
        'page-top': 'var(--page-top)',
        'page-top-mobile': 'var(--page-top-mobile)',
        'page-bottom': 'var(--page-bottom)',
        'page-bottom-mobile': 'var(--page-bottom-mobile)'
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      animation: {
        slideUp: 'slideUpAnimation 0.25s ease-in-out',
        shine: 'shineAnimation 3s linear 0s infinite normal forwards'
      },
      keyframes: {
        slideUpAnimation: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        shineAnimation: {
          '0%': { 'background-position': 'left' },
          '50%': { 'background-position': 'right' }
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
