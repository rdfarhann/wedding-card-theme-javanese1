import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Traditional Javanese batik-inspired palette
        ivory: "#FFF8E7",
        cream: "#F5E9D3",
        sogan: {
          DEFAULT: "#6B4226", // batik sogan brown
          light: "#8A5A34",
          dark: "#4A2C18",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E0C158",
        },
        maroon: "#7A1F2B",
        dark: "#2B1B12",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      letterSpacing: {
        label: "0.2em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.4" },
          "100%": {
            transform: "translateY(-120vh) rotate(180deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        drift: "drift 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
