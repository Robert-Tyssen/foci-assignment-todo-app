/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base name must match repo name for correct deployment to GitHub pages
  base: "/foci-assignment-todo-app/",

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
      reportOnFailure: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/test/**", "**/*.d.ts", "**/*.config.*"],
    },
  },
});
