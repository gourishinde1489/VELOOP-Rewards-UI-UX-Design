import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#161827",
        card: "rgba(32, 36, 58, 0.45)",
        gold: {
          light: "#fff0b3",
          DEFAULT: "#c49a45",
          dark: "#9b7028",
          border: "#b7822a"
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
