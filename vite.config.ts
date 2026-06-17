import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio-nikhil/",
  server: {
    port: 5174,
    strictPort: false
  },
  preview: {
    port: 4174,
    strictPort: false
  }
});
