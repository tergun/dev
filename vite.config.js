import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

export default defineConfig({
  plugins: [uni()],
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome80',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html')
      }
    }
  }
})
