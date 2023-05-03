import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    }
  },
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config;
