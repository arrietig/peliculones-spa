/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Righteous", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#A855F7",
          dark: "#9333EA",
          light: "#C084FC",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(168, 85, 247, 0.35)",
        "glow-sm": "0 0 12px rgba(168, 85, 247, 0.25)",
        "glow-lg": "0 0 40px rgba(168, 85, 247, 0.45)",
      },
      backgroundImage: {
        "app-gradient":
          "linear-gradient(135deg, #0A0015 0%, #050010 50%, #00040F 100%)",
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
