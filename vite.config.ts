import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

installGlobals();

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    svgr()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/base.scss";'
      }
    }
  }
});
