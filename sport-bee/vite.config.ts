import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default ({ mode }) => {
  return defineConfig({
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      VitePWA({
        devOptions: {
          enabled: true, // For making sure that the PWA is testable from the Local dev environment
        },
        manifest: {
          name: "SportsBee",
          short_name: "SportsBee",
          icons: [
            {
              src: "/favicon.ico",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "/favicon-72x72.png",
              type: "image/png",
              sizes: "72x72",
            },
            {
              src: "/favicon-96x96.png",
              type: "image/png",
              sizes: "96x96",
            },
            {
              src: "/pwa-192x192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "/pwa-512x512.png",
              type: "image/png",
              sizes: "512x512",
              purpose: "any maskable", // Icon format that ensures that your PWA icon looks great on all Android devices
            },
          ],
          theme_color: "#AAF",
        },
      }),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
  });
};
