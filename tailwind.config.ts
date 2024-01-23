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
        "primary": "#B13CCF",
        "primary-hover": "#9B2DB8"

      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
