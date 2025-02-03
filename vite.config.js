import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Configuration object

  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  // The plugins array tells Vite what plugins to use
  // react() adds React-specific features
  // jsxRuntime: 'automatic' enables the new JSX Transform from React 17+
  // This means you don't need to import React in every file

  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // resolve.alias creates path aliases for imports
  // '@': '/src' means you can use '@/components/Button'
  // instead of '../../../src/components/Button'
  // Makes imports cleaner and more maintainable
});
