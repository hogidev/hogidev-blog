/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
