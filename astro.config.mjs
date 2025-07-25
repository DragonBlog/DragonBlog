// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      TITLE: envField.string({
        context: "client",
        access: "public",
        default: "Dragon Blog",
      }),
    },
  },

  integrations: [react()],
});
