import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { version } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  base: "/software/tower-of-hanoi",
  define: {
    "import.meta.env.VERSION": JSON.stringify(version),
  },
  plugins: [react()],
});
