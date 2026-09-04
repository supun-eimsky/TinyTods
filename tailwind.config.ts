import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#07545A",
          50: "#E8F2F1",
          100: "#CFE4E2",
          600: "#0B6A6F",
          700: "#07545A",
          800: "#053E42",
          900: "#032A2D",
        },
        mint: {
          DEFAULT: "#8FC8B5",
          light: "#D0E5D6",
          dark: "#6FB49E",
        },
        sage: "#D0E5D6",
        cream: "#FFF8EE",
        sky: {
          DEFAULT: "#6DBFD8",
          light: "#CDEBF3",
        },
        sunshine: {
          DEFAULT: "#FFC44D",
          light: "#FFE7B8",
        },
        peach: {
          DEFAULT: "#F5B78F",
          light: "#FBE1CE",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "ui-rounded", "sans-serif"],
        body: ["var(--font-nunito)", "ui-sans-serif", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        blob: "60% 40% 55% 45% / 50% 55% 45% 50%",
      },
      boxShadow: {
        soft: "0 12px 30px -10px rgba(7, 84, 90, 0.18)",
        card: "0 8px 24px -8px rgba(7, 84, 90, 0.14)",
        lift: "0 20px 40px -14px rgba(7, 84, 90, 0.28)",
      },
      maxWidth: {
        content: "1360px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
