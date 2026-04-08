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
      '@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@queries': path.resolve(__dirname, 'src/queries/index.ts'),
      '@contexts': path.resolve(__dirname, 'src/contexts/index.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts'),
      '@seeds': path.resolve(__dirname, 'src/seeds/index.ts'),
      '@store': path.resolve(__dirname, 'src/store/index.ts')
    }
  }
})
