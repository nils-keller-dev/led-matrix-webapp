import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      primary: "#fafafa",
      secondary: "#27272a",
      background: "#09090b",
      "muted-foreground": "#a1a1aa",
    },
    fontFamily: {
      abril: ["Abril Fatface", "sans-serif"],
    }
  },
} satisfies Config;
