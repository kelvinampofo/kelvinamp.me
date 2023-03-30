import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
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
