import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5040",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, "/api/v1"),
      },
      "/images": {
        target: "http://localhost:5040",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, "/images"),
      },
    },
  },
});
