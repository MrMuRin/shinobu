import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: +env.npm_package_config_port || 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo?.name?.split('.').at(-1) || ''
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
              extType = 'img'
            }
            if (/ttf|otf|woff2?|eot/i.test(extType)) {
              extType = 'font'
            }
            if (/css/i.test(extType)) {
              return 'assets/[name][extname]'
            }
            return `assets/${extType}/[name][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name].js',
        },
      },
    },
  };
});
