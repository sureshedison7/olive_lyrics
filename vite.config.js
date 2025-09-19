// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Make sure this import is present if you use React

export default defineConfig({
  plugins: [
    react(), // Include this if you have `@astrojs/react` integration
  ],
  resolve: {
    alias: {
      "react-dom/server": "react-dom/server.edge",
    },
  },
});
