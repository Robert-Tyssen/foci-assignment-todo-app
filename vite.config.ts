/// <reference types="vitest/config" />

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Important - must be placed before the react() plugin
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),

    react(),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
  },
});
