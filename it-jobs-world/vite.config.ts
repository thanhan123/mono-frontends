import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@core-common": resolve(__dirname, "../core-common/src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', ".web.ts"]
  }
})
