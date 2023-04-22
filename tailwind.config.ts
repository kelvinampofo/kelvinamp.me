import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './posts/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
} satisfies Config;
