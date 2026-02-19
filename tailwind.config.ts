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
        vintage: {
          cream: "#F5F5DC",
          beige: "#F2E8CF",
          brown: {
            light: "#A68A64",
            DEFAULT: "#582F0E",
            dark: "#331800",
          },
          olive: "#6B705C",
          clay: "#A44A3F",
          gold: "#BC6C25",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
