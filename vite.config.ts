import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Match imports starting with `~/` to the project's `src` directory
      { find: '~', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
})
