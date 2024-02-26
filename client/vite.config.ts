import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@ui': path.resolve(__dirname, 'share/UI'),
            '@hooks': path.resolve(__dirname, 'share/hooks'),
            '@HOCs': path.resolve(__dirname, 'share/HOC'),
            '@mytypes': path.resolve(__dirname, 'share/types'),
            '@share': path.resolve(__dirname, 'share'),
        },
    },
})
