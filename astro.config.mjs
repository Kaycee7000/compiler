import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sentry from "@sentry/astro";

export default defineConfig({
  output: "server", 
  adapter: cloudflare(),
  integrations: [
    react(),
    sentry({
      project: "javascript-astro",
      org: "kaycee-lz",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  ],
  vite: {
    plugins: [tailwindcss()],
    // Removed the manual alias block so Astro defers to tsconfig.json automatically
  },
});
