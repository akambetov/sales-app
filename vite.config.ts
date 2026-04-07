import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/@types/index.ts'),
      '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
      '@constants': path.resolve(__dirname, 'src/constants/index.ts'),
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@contexts': path.resolve(__dirname, 'src/contexts/index.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts')
    }
  }
})
