import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05070a",
          2: "#0a0e12",
          3: "#11161d",
          elevated: "#0a0e12",
          surface: "#070a0e",
        },
        bone: {
          DEFAULT: "#dfe7e0",
          dim: "#aab4ad",
          muted: "#78837c",
        },
        vermilion: {
          DEFAULT: "#e0231c",
          ember: "#ff5a3c",
        },
        gold: "#c9a24a",
        line: {
          DEFAULT: "rgba(223, 231, 224, 0.13)",
          soft: "rgba(223, 231, 224, 0.07)",
          strong: "rgba(223, 231, 224, 0.28)",
        },
      },
      fontFamily: {
        sans: ["Onest", "system-ui", "-apple-system", "sans-serif"],
        display: ["Wordmark", "Onest", "Georgia", "serif"],
        jp: ["NotoJP", "Onest", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
        widest3: "0.32em",
      },
    },
  },
  plugins: [],
};

export default config;
