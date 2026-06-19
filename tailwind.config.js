/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F6F4EF",
          soft: "#FBFAF7",
        },
        ink: {
          DEFAULT: "#2E2B27",
          soft: "#6B665F",
          faint: "#A39C92",
        },
        moss: {
          50: "#EFF2EE",
          100: "#E4EAE2",
          200: "#C9D5C5",
          300: "#A8BBA1",
          400: "#85A07C",
          500: "#5B7065",
          600: "#4A5C52",
          700: "#3B4A42",
        },
        clay: {
          100: "#F3E7DF",
          200: "#E6CDBC",
          300: "#D3A98C",
          400: "#B98B73",
          500: "#A07259",
        },
        line: "#E6E1D8",
      },
      fontFamily: {
        display: ["'Zen Old Mincho'", "serif"],
        body: ["'Zen Kaku Gothic New'", "'Noto Sans JP'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 16px rgba(46, 43, 39, 0.06)",
        card: "0 4px 24px rgba(46, 43, 39, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.92" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        breathe: "breathe 4.5s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
      },
    },
  },
  plugins: [],
}
