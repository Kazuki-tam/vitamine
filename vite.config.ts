import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { getPageConfig, globalConfig } from './src/config/pages';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    target: 'es2022',
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/templates/partials'),
      context(pagePath: string) {
        const normalizedPath = pagePath.replace(/\\/g, '/');
        const relativePath = normalizedPath.replace(resolve(__dirname, 'src'), '');
        const pageConfig = getPageConfig(relativePath);

        return {
          // グローバル設定
          ...globalConfig,
          currentYear: new Date().getFullYear(),
          // ページ固有の設定
          ...(pageConfig || {}),
        };
      },
    }),
    ViteImageOptimizer({
      png: {
        quality: 90,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
      svg: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
});
