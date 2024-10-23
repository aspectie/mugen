import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

installGlobals()

export default defineConfig({
  plugins: [remix(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url)),
      '@widgets': fileURLToPath(new URL('./widgets', import.meta.url)),
      '@features': fileURLToPath(new URL('./features', import.meta.url)),
      '@entities': fileURLToPath(new URL('./entities', import.meta.url)),
      '@shared': fileURLToPath(new URL('./shared', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/base.scss";'
      }
    }
  }
})
