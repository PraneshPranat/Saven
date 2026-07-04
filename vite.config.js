import { defineConfig } from 'vite'
import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import manifest from "./manifest.json" assert { type: "json" };
import react from "@vitejs/plugin-react";

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
  build: {
    rollupOptions: {
      output: { chunkFileNames: "assets/chunk-[hash].js" },
    },
  },
});
