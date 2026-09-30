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
        heat: {
          DEFAULT: "#fa5d19",
          dark: "#db4808",
          4: "rgba(250, 93, 25, 0.04)",
          8: "rgba(250, 93, 25, 0.08)",
          16: "rgba(250, 93, 25, 0.16)",
        },
        ink: {
          DEFAULT: "#262626",
          88: "rgba(38, 38, 38, 0.88)",
          64: "rgba(38, 38, 38, 0.64)",
          48: "rgba(38, 38, 38, 0.48)",
          32: "rgba(38, 38, 38, 0.32)",
          16: "rgba(38, 38, 38, 0.16)",
          6: "rgba(38, 38, 38, 0.06)",
        },
        canvas: {
          base: "#f9f9f9",
          lighter: "#fbfbfb",
          surface: "#ffffff",
        },
        edge: {
          DEFAULT: "#ededed",
          muted: "#e8e8e8",
        },
        code: "#1c1c1c",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "Consolas", "monospace"],
      },
      maxWidth: {
        shell: "1112px",
      },
    },
  },
  plugins: [],
};

export default config;
