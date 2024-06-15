import typograhpy from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        serif: ['var(--font-newsreader)']
      },
      colors: {
        primary: '#404040',
        secondary: '#6F6F6F',
        'primary-dark': '#EDEDED',
        'secondary-dark': '#A0A0A0'
      },
      spacing: {
        'page-top': 'var(--page-top)',
        'page-top-mobile': 'var(--page-top-mobile)',
        'page-bottom': 'var(--page-bottom)',
        'page-bottom-mobile': 'var(--page-bottom-mobile)'
      },
      keyframes: {
        shine: {
          '100%': { backgroundPosition: '-200% 0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        shine: 'shine 2s linear infinite',
        marquee: 'marquee 20s linear infinite',
        'marquee-reduced': 'marquee 50s linear infinite'
      },
      backgroundSize: {
        '200%': '200%'
      }
    }
  },
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [typograhpy]
} satisfies Config;
