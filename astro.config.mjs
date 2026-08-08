import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://gitview.dev",
  output: "static",
  integrations: [react()],
  build: {
    assets: "assets",
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 300,
      sourcemap: false,
    },
  },
});
