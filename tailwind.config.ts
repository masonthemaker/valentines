import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'bg-shift': 'bgShift 10s ease-in-out infinite',
      },
      keyframes: {
        bgShift: {
          '0%, 100%': { backgroundColor: '#fce7f3' },  // pink-100
          '33%': { backgroundColor: '#fbcfe8' },       // pink-200
          '66%': { backgroundColor: '#f9a8d4' },       // pink-300
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
